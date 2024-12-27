'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaCamera, FaFire } from 'react-icons/fa';
import { DownloadIcon, LoadingIcon, CheckIcon } from './icons/DownloadIcon';
import { db, storage } from '/components/firebase.config';
import { getAuth } from 'firebase/auth';
import { ref, set, get, onValue, push, update, remove } from 'firebase/database';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import Login from './Login';
import '../app/styles/wallpaperCard.css';

const WallpaperCard = ({ imageURL, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSnapped, setIsSnapped] = useState(false);
  const [downloadState, setDownloadState] = useState('idle'); // idle, downloading, success
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    if (auth.currentUser) {
      const adminUid1 = process.env.NEXT_PUBLIC_ADMIN_UID_1;
      const adminUid2 = process.env.NEXT_PUBLIC_ADMIN_UID_2;
      setIsAdmin(auth.currentUser.uid === adminUid1 || auth.currentUser.uid === adminUid2);
    }
  }, [auth.currentUser]);

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
      setShowLogin(true);
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

  const handleDelete = async () => {
    if (!isAdmin) return;

    const wallpaperKey = getWallpaperKey(imageURL);
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      alert('Please login first');
      return;
    }

    try {
      // Check if wallpaper exists in any user's snapped collection
      const usersRef = ref(db, 'users');
      const snapshot = await get(usersRef);
      
      if (snapshot.exists()) {
        const users = snapshot.val();
        for (const uid in users) {
          if (users[uid].snapped && users[uid].snapped[wallpaperKey]) {
            alert('Cannot delete: This wallpaper exists in users\' snapped collections');
            return;
          }
        }
      }

      // If wallpaper is not snapped by any user, delete it from storage
      const imageRef = storageRef(storage, imageURL);
      await deleteObject(imageRef);
      alert('Successfully deleted');
    } catch (error) {
      console.error('Error deleting wallpaper:', error);
      alert('Error deleting wallpaper. Please try again.');
    }
  };

  const handleMouseEnter = () => {
    if (!document.querySelector('.suggestion-container')) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div 
        className={`firebase-wallpaper-card firebase-wallpaper-card-${type}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isAdmin && (
          <button 
            onClick={handleDelete}
            className="delete-button"
            title="Delete Wallpaper"
          >
            <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ff3b3b" d="M436,40h-81.716c-5.304,0-10.391-2.107-14.142-5.858L311.858,5.858C308.107,2.107,303.02,0,297.716,0h-83.432 c-5.304,0-10.391,2.107-14.142,5.858l-28.284,28.284C168.107,37.893,163.02,40,157.716,40H76c-22.091,0-40,17.909-40,40 s17.909,40,40,40h0v332c0,33.137,26.863,60,60,60h240c33.137,0,60-26.863,60-60V120c22.091,0,40-17.909,40-40S458.091,40,436,40z M216,402c0,16.569-13.431,30-30,30s-30-13.431-30-30V190c0-16.569,13.431-30,30-30s30,13.431,30,30V402z M356,402 c0,16.569-13.431,30-30,30s-30-13.431-30-30V190c0-16.569,13.431-30,30-30s30,13.431,30,30V402z"/>
            </svg>
          </button>
        )}
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
      {showLogin && <Login onClose={() => setShowLogin(false)} currentPath={window.location.pathname} />}
    </>
  );
};

export default WallpaperCard;