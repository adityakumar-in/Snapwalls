'use client'
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import WallpaperCard from '@/components/WallpaperCard';
import '../styles/explore.css';

const ExplorePage = () => {
    const [wallpapers, setWallpapers] = useState([]);
    const [searchInfo, setSearchInfo] = useState(null);
    const [columnCount, setColumnCount] = useState(2);

    useEffect(() => {
        const updateColumnCount = () => {
            const width = window.innerWidth;
            if (width >= 1600) setColumnCount(5);
            else if (width >= 1200) setColumnCount(4);
            else if (width >= 768) setColumnCount(3);
            else setColumnCount(2);
        };

        updateColumnCount();
        window.addEventListener('resize', updateColumnCount);
        return () => window.removeEventListener('resize', updateColumnCount);
    }, []);

    const handleSearch = ({ wallpapers, searchInfo }) => {
        setWallpapers(wallpapers);
        setSearchInfo(searchInfo);
    };

    const distributeWallpapers = () => {
        if (wallpapers.length === 0) return [];

        // Separate desktop and phone wallpapers
        const desktopWallpapers = wallpapers.filter(wp => wp.type === 'desktop' || !wp.type);
        const phoneWallpapers = wallpapers.filter(wp => wp.type === 'phone');

        // Calculate desktop wallpapers per column
        const desktopPerColumn = Math.ceil(desktopWallpapers.length / columnCount);

        return Array.from({ length: columnCount }, (_, colIndex) => {
            // Get desktop wallpapers for this column
            const startDesktopIdx = colIndex * desktopPerColumn;
            const endDesktopIdx = Math.min((colIndex + 1) * desktopPerColumn, desktopWallpapers.length);
            const columnDesktopWallpapers = desktopWallpapers.slice(startDesktopIdx, endDesktopIdx);

            // Get phone wallpapers for this column
            const columnPhoneWallpapers = phoneWallpapers.filter((_, i) => i % columnCount === colIndex);

            // Merge desktop and phone wallpapers with spacing
            const columnWallpapers = [];
            const phoneWallpapersPerSegment = Math.ceil(columnPhoneWallpapers.length / (columnDesktopWallpapers.length + 1));

            // Add initial phone wallpapers
            columnWallpapers.push(...columnPhoneWallpapers.slice(0, phoneWallpapersPerSegment));

            // Intersperse desktop wallpapers with remaining phone wallpapers
            columnDesktopWallpapers.forEach((desktop, idx) => {
                columnWallpapers.push(desktop);
                const startIdx = (idx + 1) * phoneWallpapersPerSegment;
                const endIdx = startIdx + phoneWallpapersPerSegment;
                const phoneSegment = columnPhoneWallpapers.slice(startIdx, endIdx);
                columnWallpapers.push(...phoneSegment);
            });

            return (
                <div key={colIndex} className="wallpaper-column">
                    {columnWallpapers.map((wallpaper, index) => (
                        <WallpaperCard
                            key={`${wallpaper.originalName}-${index}`}
                            imageURL={wallpaper.url}
                            type={wallpaper.type || 'desktop'}
                            title={wallpaper.displayName}
                        />
                    ))}
                </div>
            );
        });
    };

    return (
        <div className="default-padding">
            <h1 className="explore-title">Explore Wallpapers</h1>
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
            <div className="wallpaper-masonry" style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                gap: '20px',
                width: '100%',
            }}>
                {wallpapers.length === 0 ? (
                    <div className="no-results">No wallpapers found</div>
                ) : (
                    distributeWallpapers()
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
