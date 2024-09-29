'use client'
import React from 'react';
import Image from 'next/image';
import '@/app/styles/wallpaper.css';

const Wallpaper = ({ wallpapers, fileNames }) => {
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

  return (
    <div className="wallpaper-container">
      {wallpapers.map((wallpaper, index) => (
        <div key={index} className="wallpaper-item">
          <Image 
            src={`/wallpapers/${wallpaper}`} 
            alt={fileNames[index] || `Wallpaper ${index + 1}`}
            className="wallpaper-image"
            width={500}
            height={300}
          />
          <div 
            className="download-icon"
            onClick={() => downloadWallpaper(wallpaper, fileNames[index])}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
              <path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wallpaper;