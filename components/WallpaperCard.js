'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaCamera, FaDownload } from 'react-icons/fa';
import '../app/styles/wallpaperCard.css';

const WallpaperCard = ({ imageURL, type }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div 
      className={`wallpaper-card wallpaper-card-${type}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={imageURL}
        alt="Wallpaper"
        fill
        className="wallpaper-image"
      />
      
      {/* Snap Button */}
      <button 
        className={`card-button snap-button ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <FaCamera className="button-icon" />
      </button>

      {/* Download Button */}
      <button 
        onClick={handleDownload}
        className={`card-button download-button ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <FaDownload className="button-icon" />
      </button>
    </div>
  );
};

export default WallpaperCard;