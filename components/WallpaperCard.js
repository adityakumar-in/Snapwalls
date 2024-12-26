'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCamera, FaFire } from 'react-icons/fa';
import { DownloadIcon, LoadingIcon, CheckIcon } from './icons/DownloadIcon';
import { db } from '/components/firebase.config';
import { getAuth } from 'firebase/auth';
import { ref, set, get, onValue, push, update, remove } from 'firebase/database';
import '../app/styles/wallpaperCard.css';

const WallpaperCard = ({ imageURL, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [downloadState, setDownloadState] = useState('idle'); // idle, downloading, success
  const auth = getAuth();

  const getWallpaperKey = (url) => {
    // Create a simple hash of the URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Make sure it's positive and convert to base36 for shorter string
    return Math.abs(hash).toString(36);
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const wallpaperKey = getWallpaperKey(imageURL);
    const snappedRef = ref(db, `users/${auth.currentUser.uid}/snapped/${wallpaperKey}`);
    
    onValue(snappedRef, (snapshot) => {
      setIsSnapped(snapshot.exists());
    });
  }, [imageURL, auth.currentUser]);

  const handleDownload = async () => {
    try {
      setDownloadState('downloading');
      
      // Get the filename from the Firebase URL
      const urlObj = new URL(imageURL);
      const pathSegments = urlObj.pathname.split('/');
      const encodedFilename = pathSegments[pathSegments.length - 1].split('?')[0];
      const filename = decodeURIComponent(encodedFilename);
      
      const parts = filename.split('_');
      
      let name = '';
      
      if (parts.length >= 2) {
        // Get the second to last part
        const rawName = parts[parts.length - 2];
        
        // Remove any numbers from the end and split by hyphen
        name = rawName.replace(/-\d+$/, '').split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      } else {
        name = 'wallpaper';
      }
      
      const extension = filename.split('.').pop();
      const finalFilename = `${name}.${extension}`;

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
      
      setDownloadState('success');
      
      // Reset to idle state after showing success
      setTimeout(() => {
        setDownloadState('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
      setDownloadState('idle');
    }
  };

  const handleSnap = async (e) => {
    e.stopPropagation();
    if (!auth.currentUser) {
      alert('Please login to snap wallpapers');
      return;
    }

    const wallpaperKey = getWallpaperKey(imageURL);
    const snappedRef = ref(db, `users/${auth.currentUser.uid}/snapped/${wallpaperKey}`);
    
    try {
      if (isSnapped) {
        await remove(snappedRef);
      } else {
        await set(snappedRef, {
          url: imageURL,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error('Error updating snap status:', error);
    }
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
        disabled={downloadState === 'downloading'}
        className={`firebase-card-button firebase-download-button ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {downloadState === 'downloading' && <LoadingIcon />}
        {downloadState === 'success' && <CheckIcon />}
        {downloadState === 'idle' && <DownloadIcon />}
      </button>
    </div>
  );
};

export default WallpaperCard;