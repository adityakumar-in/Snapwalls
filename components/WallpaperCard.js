'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaCamera, FaDownload, FaFire } from 'react-icons/fa';
import '../app/styles/wallpaperCard.css';

const WallpaperCard = ({ imageURL, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wallpaper-${type}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };

  const handleSnap = (e) => {
    e.stopPropagation();
    setIsSnapped(!isSnapped);
  };

  return (
    <div 
      className={`firebase-wallpaper-card firebase-wallpaper-card-${type}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageURL}
        alt="Wallpaper"
        fill
        className="firebase-wallpaper-image"
      />
      
      <button 
        onClick={handleSnap}
        className={`firebase-card-button firebase-snap-button ${isHovered ? 'opacity-100' : 'opacity-0'} ${isSnapped ? 'firebase-snapped' : ''}`}
      >
        {isSnapped ? (
          <>
            <FaFire className="firebase-button-icon" />
            <span className="firebase-snap-text firebase-snapped">Snapped</span>
          </>
        ) : (
          <>
            <FaCamera className="firebase-button-icon" />
            <span className="firebase-snap-text">Snap</span>
          </>
        )}
      </button>

      <button 
        onClick={handleDownload}
        className={`firebase-card-button firebase-download-button ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <FaDownload className="firebase-button-icon" />
      </button>
    </div>
  );
};

export default WallpaperCard;