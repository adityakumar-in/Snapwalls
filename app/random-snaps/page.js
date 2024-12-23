'use client';

import React, { useState } from 'react'
import { generatePollinationImage } from '@/utils/pollinations'
import '/app/styles/randomSnaps.css'

const WALLPAPER_CATEGORIES = {
  nature: {
    weight: 0.25,
    prompts: [
      'stunning nature landscape, majestic mountains, serene lakes',
      'beautiful forest scene, mystical woodland, enchanted nature',
      'ocean waves, coastal scenery, beach paradise',
      'dramatic sunset landscape, golden hour nature photography'
    ]
  },
  abstract: {
    weight: 0.2,
    prompts: [
      'modern abstract art, fluid shapes, contemporary design',
      'geometric patterns, minimalist abstract composition',
      'colorful abstract waves, dynamic flowing shapes',
      'abstract cosmic art, space-inspired patterns'
    ]
  },
  anime: {
    weight: 0.15,
    prompts: [
      'anime scenic background art, studio ghibli inspired',
      'japanese anime art style, vibrant anime landscape',
      'anime fantasy scene, magical anime environment',
      'cyberpunk anime cityscape, futuristic anime art'
    ]
  },
  minimal: {
    weight: 0.2,
    prompts: [
      'minimalist design, clean simple composition',
      'zen minimalist art, peaceful simple shapes',
      'modern minimalist patterns, elegant simple design',
      'architectural minimalism, clean lines and shapes'
    ]
  },
  fantasy: {
    weight: 0.2,
    prompts: [
      'fantasy landscape, magical environment, mystical scene',
      'enchanted world, fantasy art, magical atmosphere',
      'dreamlike fantasy scene, surreal environment',
      'magical fantasy realm, ethereal landscape'
    ]
  }
};

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [wallpaperType, setWallpaperType] = useState('desktop');
  const [currentCategory, setCurrentCategory] = useState('');

  const getWallpaperDimensions = () => {
    return wallpaperType === 'desktop' 
      ? { width: 1920, height: 1080 }
      : { width: 1440, height: 2560 };
  };

  const getRandomCategory = () => {
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (const [category, data] of Object.entries(WALLPAPER_CATEGORIES)) {
      cumulativeWeight += data.weight;
      if (random <= cumulativeWeight) {
        return category;
      }
    }
    
    return Object.keys(WALLPAPER_CATEGORIES)[0]; // Fallback to first category
  };

  const getRandomPrompt = (category) => {
    const prompts = WALLPAPER_CATEGORIES[category].prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleGenerateImage = async () => {
    setImageUrl('');
    setImageLoaded(false);
    setLoading(true);
    
    try {
      const dimensions = getWallpaperDimensions();
      const selectedCategory = getRandomCategory();
      setCurrentCategory(selectedCategory);
      const basePrompt = getRandomPrompt(selectedCategory);
      
      // Quality modifiers for ultra HD output
      const qualityModifiers = 'ultra detailed, ultra HD, 4k quality, crystal clear, masterpiece, sharp focus, professional quality';
      
      // Orientation-specific modifiers
      const orientationModifiers = wallpaperType === 'phone' 
        ? 'perfect vertical composition, mobile wallpaper style, vertical format'
        : 'perfect horizontal composition, desktop wallpaper style, wide format';
      
      // Combine all prompt elements
      const prompt = `${basePrompt}, ${orientationModifiers}, ${qualityModifiers} --no blur, noise, pixelation, low quality, text, watermark, artifacts, distortion`;
      
      const url = await generatePollinationImage(prompt, dimensions);
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
    <div className='default-padding'>
      <div className='random-snaps-container'>
        <h1>AI Wallpaper Generator</h1>
        
        <div className='controls'>
          <div className='wallpaper-type' data-active={wallpaperType}>
            <button 
              className={`type-button ${wallpaperType === 'desktop' ? 'active' : ''}`}
              onClick={() => setWallpaperType('desktop')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
              </svg>
              <span>Desktop</span>
            </button>
            <button 
              className={`type-button ${wallpaperType === 'phone' ? 'active' : ''}`}
              onClick={() => setWallpaperType('phone')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
              <span>Mobile</span>
            </button>
          </div>
          
          <button 
            onClick={handleGenerateImage}
            disabled={loading}
            className='generate-button'
          >
            {loading ? 'Creating Magic...' : 'Generate Random Wallpaper'}
          </button>
        </div>
        
        <div className={`image-container ${wallpaperType}`}>
          {loading && (
            <div className='skeleton-container'>
              <div className='loading-spinner'></div>
              <div className='generating-text'>
                <span>Generating your {currentCategory} wallpaper</span>
                <div className='random-snap-loading-dots'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          {imageUrl && !loading && (
            <div className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
              <img 
                src={imageUrl} 
                alt={`Generated ${currentCategory} wallpaper`}
                className='generated-image'
                onLoad={handleImageLoad}
              />
              {imageLoaded && (
                <button onClick={handleDownload} className='random-snap-download-btn'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z" fill="currentColor"/>
                  </svg>
                  <span>Download</span>
                  <div className="random-snap-download-shine"></div>
                </button>
              )}
            </div>
          )}
          {!loading && !imageUrl && (
            <div className='skeleton-container empty'>
              <div className='placeholder-text'>Click Generate to create a random {wallpaperType} wallpaper</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
