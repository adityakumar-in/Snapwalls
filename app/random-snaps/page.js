'use client';

import React, { useState } from 'react'
import { generatePollinationImage } from '@/utils/pollinations'
import '/app/styles/randomSnaps.css'

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [wallpaperType, setWallpaperType] = useState('desktop'); // 'desktop' or 'phone'

  const getWallpaperDimensions = () => {
    return wallpaperType === 'desktop' 
      ? { width: 1920, height: 1080 }  // 16:9 for desktop
      : { width: 1080, height: 1920 }; // 9:16 for phone
  };

  const handleGenerateImage = async () => {
    setImageUrl('');
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
          <img src={imageUrl} alt="Generated artwork" className='generated-image' />
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
