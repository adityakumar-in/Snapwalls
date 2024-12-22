'use client';

import React, { useState } from 'react'
import { generatePollinationImage } from '@/utils/pollinations'
import '/app/styles/randomSnaps.css'

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [wallpaperType, setWallpaperType] = useState('desktop'); // 'desktop' or 'phone'

  const getWallpaperDimensions = () => {
    return wallpaperType === 'desktop' 
      ? { width: 1920, height: 1080 }  // 16:9 for desktop
      : { width: 1080, height: 1920 }; // 9:16 for phone
  };

  const handleGenerateImage = async () => {
    setImageUrl('');
    setImageLoaded(false);
    setLoading(true);
    const prompts = [
      "beautiful landscape photography",
      "abstract digital art",
      "colorful sunset over mountains",
      "futuristic cityscape at night",
      "magical forest scene",
      "ocean waves at dawn",
      "space nebula and stars",
      "artistic flower composition",
      "minimalist geometric patterns",
      "cyberpunk city streets",
      "northern lights in the mountains",
      "watercolor splash art",
      "neon light trails in the dark",
      "misty morning forest"
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    
    try {
      const dimensions = getWallpaperDimensions();
      const url = await generatePollinationImage(randomPrompt, dimensions);
      setImageUrl(url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallpaper-${wallpaperType}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className='random-snaps-container'>
      <h1>Random Snaps</h1>
      
      <div className='controls'>
        <div className='wallpaper-type'>
          <button 
            className={`type-button ${wallpaperType === 'desktop' ? 'active' : ''}`}
            onClick={() => setWallpaperType('desktop')}
          >
            Desktop
          </button>
          <button 
            className={`type-button ${wallpaperType === 'phone' ? 'active' : ''}`}
            onClick={() => setWallpaperType('phone')}
          >
            Phone
          </button>
        </div>
        
        <button 
          onClick={handleGenerateImage}
          disabled={loading}
          className='generate-button'
        >
          {loading ? 'Creating...' : 'Random Generate'}
        </button>
      </div>
      
      <div className={`image-container ${wallpaperType}`}>
        {loading && (
          <div className='skeleton-container'>
            <div className='skeleton-animation'></div>
            <div className='generating-text'>
              <span className='dot-animation'>Creating {wallpaperType} wallpaper</span>
            </div>
          </div>
        )}
        {imageUrl && !loading && (
          <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
            <img 
              src={imageUrl} 
              alt="Generated artwork" 
              className='generated-image'
              onLoad={handleImageLoad}
            />
            {imageLoaded && (
              <button onClick={handleDownload} className='download-button'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z" fill="currentColor"/>
                </svg>
                Download
              </button>
            )}
          </div>
        )}
        {!loading && !imageUrl && (
          <div className='skeleton-container empty'>
            <div className='placeholder-text'>Click Generate to create a {wallpaperType} wallpaper</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
