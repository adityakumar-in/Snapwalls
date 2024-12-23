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
      console.log('Starting download for URL:', imageURL);
      
      // Get the filename from the Firebase URL
      const urlObj = new URL(imageURL);
      const pathSegments = urlObj.pathname.split('/');
      const encodedFilename = pathSegments[pathSegments.length - 1].split('?')[0];
      const filename = decodeURIComponent(encodedFilename);
      console.log('Original filename:', filename);
      
      const parts = filename.split('_');
      console.log('Filename parts:', parts);
      
      let name = '';
      
      if (parts.length >= 2) {
        // Get the second to last part
        const rawName = parts[parts.length - 2];
        console.log('Raw name part:', rawName);
        
        // Remove any numbers from the end and split by hyphen
        name = rawName.replace(/-\d+$/, '').split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else {
        name = 'wallpaper';
      }
      console.log('Final name:', name);
      
      const extension = filename.split('.').pop();
      const finalFilename = `${name}.${extension}`;
      console.log('Final filename:', finalFilename);

      // Create the download URL with parameters
      const downloadUrl = `/api/download?url=${encodeURIComponent(imageURL)}&filename=${encodeURIComponent(finalFilename)}`;
      
      // Fetch the file directly
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create and click a temporary download link
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = blobUrl;
      link.download = finalFilename;
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      console.log('Download initiated');
      
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
        width={500}
        height={300}
        priority
        className="firebase-wallpaper-image"
      />
      
      <div className="firebase-card-buttons">
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
          <span className="firebase-download-text">Download</span>
        </button>
      </div>
    </div>
  );
};

export default WallpaperCard;