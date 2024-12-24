'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import '../app/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allImageNames, setAllImageNames] = useState([]);

    // Helper function to extract searchable terms from filename
    const getSearchableTerms = (filename) => {
        // Remove file extension and _mobile suffix
        const baseName = filename.replace(/\.(png|jpg|jpeg)$/, '').replace(/_mobile$/, '');
        // Split by underscores and hyphens
        const terms = baseName.split(/[_-]/).filter(term => term.length > 0);
        return terms;
    };

    useEffect(() => {
        const fetchImageNames = async () => {
            console.log('Storage instance:', storage);
            try {
                console.log('Storage bucket:', storage.app.options.storageBucket);
                
                // Create reference to the root since images might be at root level
                const storageRef = ref(storage, '/');
                console.log('Storage reference:', storageRef.fullPath);

                console.log('Listing items from storage...');
                const result = await listAll(storageRef);
                console.log('Items found:', result.items.length);
                console.log('Items:', result.items.map(item => item.fullPath));

                if (result.items.length === 0) {
                    console.log('No items found in storage');
                    return;
                }

                const namesPromises = result.items.map(async (item) => {
                    try {
                        console.log('Fetching URL for:', item.fullPath);
                        const url = await getDownloadURL(item);
                        console.log('Successfully got URL for:', item.fullPath);
                        
                        // Get searchable terms from the filename
                        const searchTerms = getSearchableTerms(item.name);
                        
                        return {
                            name: item.name,
                            searchTerms: searchTerms,
                            displayName: searchTerms.join(' '), // For display in suggestions
                            url: url,
                            fullPath: item.fullPath
                        };
                    } catch (urlError) {
                        console.error('Error getting download URL for', item.fullPath, urlError);
                        return null;
                    }
                });
                
                const imageData = (await Promise.all(namesPromises)).filter(Boolean);
                console.log('Final image data:', imageData);
                
                if (imageData.length > 0) {
                    setAllImageNames(imageData);
                    onSearch(imageData);
                } else {
                    console.log('No valid images found after processing');
                }
            } catch (error) {
                console.error('Error in fetchImageNames:', error);
                console.error('Error details:', {
                    code: error.code,
                    message: error.message,
                    serverResponse: error.serverResponse
                });
            }
        };

        fetchImageNames();
    }, [onSearch]);

    const handleSearch = useCallback((term) => {
        console.log('Searching for:', term);
        if (term.trim() === '') {
            setSuggestions([]);
            onSearch(allImageNames);
            return;
        }

        const searchTerm = term.toLowerCase();
        const filtered = allImageNames.filter(image =>
            // Search through all terms extracted from the filename
            image.searchTerms.some(term => 
                term.toLowerCase().includes(searchTerm)
            )
        );
        console.log('Filtered results:', filtered);

        setSuggestions(filtered);
        onSearch(filtered);
    }, [allImageNames, onSearch]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed with term:', searchTerm);
            handleSearch(searchTerm);
            setSuggestions([]);
        }
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
                    onKeyPress={handleKeyPress}
                />
                {searchTerm && suggestions.length > 0 && (
                    <div className="suggestions-container">
                        {suggestions.map((image, index) => (
                            <div
                                key={index}
                                className="suggestion-item"
                                onClick={() => {
                                    setSearchTerm(image.displayName);
                                    handleSearch(image.displayName);
                                    setSuggestions([]);
                                }}
                            >
                                {image.displayName}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
