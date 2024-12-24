'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '@/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { FaSearch } from 'react-icons/fa';
import '@/app/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ categories: [], series: [], characters: [] });
    const [allImageNames, setAllImageNames] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

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
            } catch (error) {
                console.error('Error in fetchImageNames:', error);
            }
        };

        fetchImageNames();
    }, []);

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

        // Find the most specific match type
        const isCharacterSearch = matches.some(m => 
            m.character.toLowerCase().includes(searchTerms[searchTerms.length - 1])
        );
        const isSeriesSearch = matches.some(m => 
            m.series.toLowerCase().includes(searchTerms[searchTerms.length - 1])
        );

        // Get unique categories
        const categories = [...new Set(matches.map(m => m.category))];

        // Get unique series names
        const series = [...new Set(matches.map(m => m.series))];

        // Get unique character names, excluding series names and numbers
        const characters = [...new Set(
            matches
                .filter(m => m.character && !series.includes(m.character))
                .map(m => m.character.replace(/-\d+$/, '')) // Remove numbers at the end
        )];

        // If searching for a character, always show its series and category
        if (isCharacterSearch) {
            const characterMatches = matches.filter(m => 
                characters.some(char => m.character.startsWith(char))
            );
            const relatedSeries = [...new Set(characterMatches.map(m => m.series))];
            const relatedCategories = [...new Set(characterMatches.map(m => m.category))];
            
            return {
                categories: relatedCategories.map(formatDisplayName),
                series: relatedSeries.map(formatDisplayName),
                characters: characters.map(formatDisplayName)
            };
        }

        // If searching for a series, show its category and characters
        if (isSeriesSearch) {
            const seriesMatches = matches.filter(m => 
                series.some(s => m.series === s)
            );
            const relatedCategories = [...new Set(seriesMatches.map(m => m.category))];
            
            return {
                categories: relatedCategories.map(formatDisplayName),
                series: series.map(formatDisplayName),
                characters: characters.map(formatDisplayName)
            };
        }

        // Default case: show all relevant suggestions
        return {
            categories: categories.map(formatDisplayName),
            series: series.map(formatDisplayName),
            characters: characters.map(formatDisplayName)
        };
    }, [allImageNames, formatDisplayName]);

    const handleSearch = useCallback((term) => {
        if (term.trim() === '') {
            setSuggestions({ categories: [], series: [], characters: [] });
            onSearch({ 
                wallpapers: allImageNames,
                searchInfo: null
            });
            return;
        }

        const newSuggestions = generateSuggestions(term);
        setSuggestions(newSuggestions);

        const searchTerms = term.toLowerCase().split(' ');
        const filtered = allImageNames.filter(image =>
            searchTerms.every(term =>
                image.searchTerms.some(searchTerm =>
                    searchTerm.includes(term)
                )
            )
        );

        // Get search information
        const searchInfo = {
            category: newSuggestions.categories[0] || null,
            series: newSuggestions.series[0] || null,
            character: newSuggestions.characters[0] || null,
            searchTerm: term
        };

        onSearch({ 
            wallpapers: filtered,
            searchInfo: searchInfo
        });
    }, [allImageNames, onSearch, generateSuggestions]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim()) {
            const newSuggestions = generateSuggestions(value);
            setSuggestions(newSuggestions);
            setShowSuggestions(true);
        } else {
            setSuggestions({ categories: [], series: [], characters: [] });
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (value) => {
        setSearchTerm(value);
        setShowSuggestions(false);
        handleSearch(value);
    };

    const handleSearchClick = () => {
        setShowSuggestions(false);
        handleSearch(searchTerm);
    };

    return (
        <div className="search-container">
            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search wallpapers..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setShowSuggestions(false);
                            handleSearch(searchTerm);
                        }
                    }}
                />
                <button 
                    className="search-button"
                    onClick={handleSearchClick}
                    aria-label="Search"
                >
                    <FaSearch />
                </button>
                {searchTerm && showSuggestions && (
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
