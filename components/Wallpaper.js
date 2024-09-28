'use client'
import React from 'react';
import '@/app/styles/wallpaper.css';

const Wallpaper = ({ wallpapers, fileNames }) => {
  return (
    <div className="wallpaper-container">
      {wallpapers.map((wallpaper, index) => (
        <div key={index} className="wallpaper-item">
          <img 
            src={`/wallpapers/${wallpaper}`} 
            alt={fileNames[index] || `Wallpaper ${index + 1}`}
            className="wallpaper-image"
          />
        </div>
      ))}
    </div>
  );
};

export default Wallpaper;