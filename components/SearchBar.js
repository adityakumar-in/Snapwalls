'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import '../app/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ categories: [], series: [], characters: [] });
    const [allImageNames, setAllImageNames] = useState([]);

    // Helper function to format display names
    const formatDisplayName = (name) => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .replace(/\d+$/, ''); // Remove numbers at the end
    };

    // Helper function to extract structured data from filename
    const parseFileName = (filename) => {
        // Remove file extension and device type
        const baseName = filename.replace(/\.(png|jpg|jpeg)$/, '').replace(/_(mobile|desktop)$/, '');
        const parts = baseName.split('_');
        
        // Extract series and character names
        const category = parts[0] || '';
        const seriesName = parts[1] || '';
        const characterName = parts[2] || '';

        // Get all searchable terms
        const searchTerms = filename
            .toLowerCase()
            .replace(/\.(png|jpg|jpeg)$/, '')
            .replace(/_(mobile|desktop)$/, '')
            .split(/[_-]/)
            .filter(term => term.length > 0);

        return {
            category: category,
            series: seriesName,
            character: characterName,
            displayCategory: formatDisplayName(category),
            displaySeries: formatDisplayName(seriesName),
            displayCharacter: formatDisplayName(characterName),
            searchTerms: searchTerms,
            deviceType: filename.includes('_mobile') ? 'mobile' : 'desktop'
        };
    };

    useEffect(() => {
        const fetchImageNames = async () => {
            try {
                const storageRef = ref(storage, '/');
                const result = await listAll(storageRef);

                const namesPromises = result.items.map(async (item) => {
                    try {
                        const url = await getDownloadURL(item);
                        const parsedData = parseFileName(item.name);
                        
                        return {
                            ...parsedData,
                            originalName: item.name,
                            url: url,
                            fullPath: item.fullPath
                        };
                    } catch (urlError) {
                        console.error('Error getting download URL for', item.fullPath, urlError);
                        return null;
                    }
                });
                
                const imageData = (await Promise.all(namesPromises)).filter(Boolean);
                setAllImageNames(imageData);
                onSearch(imageData);
            } catch (error) {
                console.error('Error in fetchImageNames:', error);
            }
        };

        fetchImageNames();
    }, [onSearch]);

    const generateSuggestions = useCallback((term) => {
        if (!term) return { categories: [], series: [], characters: [] };

        const searchTerms = term.toLowerCase().split(' ');
        const matches = allImageNames.filter(image => 
            searchTerms.every(term => 
                image.searchTerms.some(searchTerm => 
                    searchTerm.includes(term)
                )
            )
        );

        // Get unique values
        const categories = [...new Set(matches.map(m => m.category))]
            .filter(category => 
                searchTerms.every(term => 
                    category.toLowerCase().includes(term)
                )
            );

        const series = [...new Set(matches.map(m => m.series))]
            .filter(series => 
                searchTerms.every(term => 
                    series.toLowerCase().includes(term)
                )
            );

        // Get unique character names for the matching series
        const characters = [...new Set(
            matches
                .filter(m => m.character && !m.character.includes(series[0])) // Exclude series names from characters
                .map(m => m.character)
        )];

        return {
            categories: categories.map(formatDisplayName).slice(0, 3),
            series: series.map(formatDisplayName).slice(0, 3),
            characters: characters.map(formatDisplayName).slice(0, 5)
        };
    }, [allImageNames]);

    const handleSearch = useCallback((term) => {
        if (term.trim() === '') {
            setSuggestions({ categories: [], series: [], characters: [] });
            onSearch(allImageNames);
            return;
        }

        const newSuggestions = generateSuggestions(term);
        setSuggestions(newSuggestions);

        // Filter wallpapers based on search terms
        const searchTerms = term.toLowerCase().split(' ');
        const filtered = allImageNames.filter(image =>
            searchTerms.every(term =>
                image.searchTerms.some(searchTerm =>
                    searchTerm.includes(term)
                )
            )
        );

        onSearch(filtered);
    }, [allImageNames, onSearch, generateSuggestions]);

    const handleSuggestionClick = (value) => {
        setSearchTerm(value);
        handleSearch(value);
        setSuggestions({ categories: [], series: [], characters: [] });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, handleSearch]);

    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search wallpapers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(searchTerm);
                            setSuggestions({ categories: [], series: [], characters: [] });
                        }
                    }}
                />
                {searchTerm && (suggestions.categories.length > 0 || suggestions.series.length > 0 || suggestions.characters.length > 0) && (
                    <div className="suggestions-container">
                        {suggestions.categories.length > 0 && (
                            <div className="suggestion-category">
                                <div className="suggestion-category-title">Categories</div>
                                {suggestions.categories.map((category, index) => (
                                    <div
                                        key={`category-${index}`}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(category)}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                        {suggestions.series.length > 0 && (
                            <div className="suggestion-category">
                                <div className="suggestion-category-title">Series</div>
                                {suggestions.series.map((series, index) => (
                                    <div
                                        key={`series-${index}`}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(series)}
                                    >
                                        {series}
                                    </div>
                                ))}
                            </div>
                        )}
                        {suggestions.characters.length > 0 && (
                            <div className="suggestion-category">
                                <div className="suggestion-category-title">Characters</div>
                                {suggestions.characters.map((character, index) => (
                                    <div
                                        key={`character-${index}`}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(character)}
                                    >
                                        {character}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
