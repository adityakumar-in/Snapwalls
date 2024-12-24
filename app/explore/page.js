'use client'
import React, { useState, useCallback } from 'react'
import '/app/styles/explore.css'
import SearchBar from '/components/SearchBar'
import WallpaperCard from '/components/WallpaperCard'

const Page = () => {
  const [filteredWallpapers, setFilteredWallpapers] = useState([]);

  const handleSearch = useCallback((wallpapers) => {
    console.log('Explore page received wallpapers:', wallpapers);
    setFilteredWallpapers(wallpapers);
  }, []);

  return (
    <div className='default-padding'>
      <h1 className='explore-title'>Explore Wallpapers</h1>
      <SearchBar onSearch={handleSearch} />
      <div className='wallpaper-grid'>
        {filteredWallpapers.length === 0 ? (
          <div className="no-results">No wallpapers found</div>
        ) : (
          filteredWallpapers.map((wallpaper, index) => (
            <WallpaperCard
              key={`${wallpaper.name}-${index}`}
              imageURL={wallpaper.url}
              type="explore"
              title={wallpaper.displayName}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Page
