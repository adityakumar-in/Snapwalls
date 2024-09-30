'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '@/app/styles/wallpaper.css';

const Wallpaper = ({ wallpapers, fileNames }) => {
  const [favorites, setFavorites] = useState({});
  const [visibleWallpapers, setVisibleWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(40);
  const loaderRef = useRef(null);

  useEffect(() => {
    setVisibleWallpapers(wallpapers.slice(0, 40));
  }, [wallpapers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && currentIndex < wallpapers.length) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [currentIndex, wallpapers]);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      const nextWallpapers = wallpapers.slice(currentIndex, currentIndex + 40);
      setVisibleWallpapers(prev => [...prev, ...nextWallpapers]);
      setCurrentIndex(prev => prev + 40);
      setIsLoading(false);
    }, 500); // Changed from 1000 to 2000 milliseconds
  };

  const downloadWallpaper = async (wallpaper, fileName) => {
    try {
      const response = await fetch(`/wallpapers/${wallpaper}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || wallpaper;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };

  const toggleFavorite = (wallpaper) => {
    setFavorites(prev => ({
      ...prev,
      [wallpaper]: !prev[wallpaper]
    }));
  };

  const extractName = (fileName) => {
    const name = fileName.split('_')[1];

    if(name.includes('-')){
      const nameParts = name.split('-');
      const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
      return capitalizedParts.join(' ');
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="wallpaper-container">
      {visibleWallpapers.map((wallpaper, index) => {
        const name = extractName(fileNames[index]);
        return (
          <div key={index} className="wallpaper-item">
            <Image 
              src={`/wallpapers/${wallpaper}`} 
              alt={fileNames[index] || `Wallpaper ${index + 1}`}
              className="wallpaper-image"
              width={500}
              height={300}
            />
            <div className="wallpaper-info">
              <span className="wallpaper-name">{name}</span>
              <div 
                className="download-icon"
                onClick={() => downloadWallpaper(wallpaper, fileNames[index])}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                  <path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div 
              className={`favorite-icon ${favorites[wallpaper] ? 'active' : ''}`}
              onClick={() => toggleFavorite(wallpaper)}
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        );
      })}
      {isLoading && (
        <div className="loading">
          <img src="/loader.gif" alt="Loading..." />
        </div>
      )}
      {!isLoading && currentIndex < wallpapers.length && (
        <div ref={loaderRef} className="loading">
          <img src="/loader.gif" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default Wallpaper;