'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { storage } from '@/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { FaSearch } from 'react-icons/fa';
import '@/app/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ categories: [], series: [], characters: [] });
    const [allImageNames, setAllImageNames] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

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

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
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
        
        // Clear search input after search
        setSearchTerm('');
        setShowSuggestions(false);
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
        handleSearch(value);
    };

    const handleSearchClick = () => {
        handleSearch(searchTerm);
    };

    return (
        <div className="search-container">
            <div className="search-input-container">
                <div className="explore-search-icon">
                <svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.1455C5.49956 8.21437 7.56975 5.69108 10.4445 5.11883C13.3193 4.54659 16.198 6.08477 17.32 8.79267C18.4421 11.5006 17.495 14.624 15.058 16.2528C12.621 17.8815 9.37287 17.562 7.3 15.4895C6.14763 14.3376 5.50014 12.775 5.5 11.1455Z" stroke="#606060" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.989 15.4905L19.5 19.0015" stroke="#606060" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
                <input
                    ref={inputRef}
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
                <div className="search-slash">/</div>
                <button 
                    className="search-clear" 
                    onClick={() => {
                        setSearchTerm('');
                        setSuggestions({ categories: [], series: [], characters: [] });
                        setShowSuggestions(false);
                        inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                {searchTerm && showSuggestions && (suggestions.categories.length > 0 || suggestions.series.length > 0 || suggestions.characters.length > 0) && (
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
