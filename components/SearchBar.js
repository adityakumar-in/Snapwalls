'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import '../app/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState({ genres: [], categories: [], names: [] });
    const [allImageNames, setAllImageNames] = useState([]);

    // Helper function to extract structured data from filename
    const parseFileName = (filename) => {
        // Remove file extension and _mobile/_desktop suffix
        const baseName = filename.replace(/\.(png|jpg|jpeg)$/, '').replace(/_(mobile|desktop)$/, '');
        const parts = baseName.split('_');
        
        return {
            genre: parts[0] || '',
            category: parts[1] || '',
            name: parts[2] || '',
            fullName: parts.join(' ')
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
        if (!term) return { genres: [], categories: [], names: [] };

        const searchTerm = term.toLowerCase();
        const matches = allImageNames.filter(image => 
            image.genre.toLowerCase().includes(searchTerm) ||
            image.category.toLowerCase().includes(searchTerm) ||
            image.name.toLowerCase().includes(searchTerm)
        );

        // Get unique values
        const genres = [...new Set(matches.map(m => m.genre))]
            .filter(genre => genre.toLowerCase().includes(searchTerm));
        const categories = [...new Set(matches.map(m => m.category))]
            .filter(category => category.toLowerCase().includes(searchTerm));
        const names = [...new Set(matches.map(m => m.name))]
            .filter(name => name.toLowerCase().includes(searchTerm));

        return {
            genres: genres.slice(0, 3),    // Limit to 3 suggestions per category
            categories: categories.slice(0, 3),
            names: names.slice(0, 3)
        };
    }, [allImageNames]);

    const handleSearch = useCallback((term) => {
        if (term.trim() === '') {
            setSuggestions({ genres: [], categories: [], names: [] });
            onSearch(allImageNames);
            return;
        }

        const newSuggestions = generateSuggestions(term);
        setSuggestions(newSuggestions);

        // Filter wallpapers based on the search term
        const filtered = allImageNames.filter(image =>
            image.genre.toLowerCase().includes(term.toLowerCase()) ||
            image.category.toLowerCase().includes(term.toLowerCase()) ||
            image.name.toLowerCase().includes(term.toLowerCase())
        );

        onSearch(filtered);
    }, [allImageNames, onSearch, generateSuggestions]);

    const handleSuggestionClick = (value) => {
        setSearchTerm(value);
        handleSearch(value);
        setSuggestions({ genres: [], categories: [], names: [] });
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
                            setSuggestions({ genres: [], categories: [], names: [] });
                        }
                    }}
                />
                {searchTerm && (suggestions.genres.length > 0 || suggestions.categories.length > 0 || suggestions.names.length > 0) && (
                    <div className="suggestions-container">
                        {suggestions.genres.length > 0 && (
                            <div className="suggestion-category">
                                <div className="suggestion-category-title">Genres</div>
                                {suggestions.genres.map((genre, index) => (
                                    <div
                                        key={`genre-${index}`}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(genre)}
                                    >
                                        {genre}
                                    </div>
                                ))}
                            </div>
                        )}
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
                        {suggestions.names.length > 0 && (
                            <div className="suggestion-category">
                                <div className="suggestion-category-title">Names</div>
                                {suggestions.names.map((name, index) => (
                                    <div
                                        key={`name-${index}`}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(name)}
                                    >
                                        {name}
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
