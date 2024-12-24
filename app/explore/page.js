'use client'
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WallpaperCard from '@/components/WallpaperCard';
import '../styles/explore.css';

const ExplorePage = () => {
    const [wallpapers, setWallpapers] = useState([]);
    const [searchInfo, setSearchInfo] = useState(null);

    const handleSearch = ({ wallpapers, searchInfo }) => {
        setWallpapers(wallpapers);
        setSearchInfo(searchInfo);
    };

    return (
        <div className="explore-container">
            <div className="search-section">
                <SearchBar onSearch={handleSearch} />
                {searchInfo && (
                    <div className="search-info">
                        {searchInfo.category && (
                            <span className="search-tag">
                                Category: {searchInfo.category}
                            </span>
                        )}
                        {searchInfo.series && (
                            <span className="search-tag">
                                Series: {searchInfo.series}
                            </span>
                        )}
                        {searchInfo.character && (
                            <span className="search-tag">
                                Character: {searchInfo.character}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div className="wallpaper-grid">
                {wallpapers.length === 0 ? (
                    <div className="no-results">No wallpapers found</div>
                ) : (
                    wallpapers.map((wallpaper, index) => (
                        <WallpaperCard
                            key={`${wallpaper.originalName}-${index}`}
                            imageURL={wallpaper.url}
                            type="explore"
                            title={wallpaper.displayName}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
