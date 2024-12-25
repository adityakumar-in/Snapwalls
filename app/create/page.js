'use client'
import React, { useEffect, useState, useRef } from 'react'
import Typed from 'typed.js';
import { getAuth } from 'firebase/auth';
import '/app/styles/create.css';
import { useRouter } from 'next/navigation';
import { generatePollinationImage } from '/utils/pollinations';
import CreateSnapProgress from '@/components/CreateSnapProgress';
import CreatedSnap from '@/components/CreatedSnap';

const page = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const el = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const tags = ['Mobile', 'Desktop'] // Add more tags here
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const [generatedImages, setGeneratedImages] = useState(null);
  const numberOfVariations = 4; // Number of wallpapers to generate

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const typed = new Typed(el.current, {
      strings: ["Anime", "Aesthetic", "Actors", "Sports", "Animated", "Nature"],
      typeSpeed: 45,
      backSpeed: 40,
      loop: true,
    });

    return () => {
      unsubscribe();
      typed.destroy();
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === '/') {
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleTagClick = (tag) => {
    // If clicking the same tag that's already selected, deselect it
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    
    // Only try to match tag if the input exactly matches a tag name
    // This prevents unselecting when typing
    const matchingTag = tags.find(
      tag => tag.toLowerCase() === newValue.toLowerCase()
    );
    if (matchingTag) {
      setSelectedTag(matchingTag);
    }
  };

  const generateSingleWallpaper = async (prompt, tag, index) => {
    // Default to 4K resolution for best quality while maintaining performance
    const dimensions = tag === 'Mobile' 
      ? { width: 1440, height: 2560 }  // 2.5K for mobile
      : { width: 3840, height: 2160 }; // 4K for desktop/default

    const imageUrl = await generatePollinationImage(prompt, {
      width: dimensions.width,
      height: dimensions.height,
      model: 'flux',
      seed: Date.now() + index // Add different seed for variations
    });

    // Create a new image object to ensure it's fully loaded
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    return imageUrl;
  };

  const handleCreate = async () => {
    if (!user) {
      return;
    }
    if (!searchInput.trim()) {
      return;
    }

    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }

    setIsGenerating(true);
    setProgressPercent(0);
    
    const progressTimer = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 90) {
          clearInterval(progressTimer);
          return 90;
        }
        return prev + 2;
      });
    }, 200);

    try {
      const prompt = `Create a ${searchInput} Wallpaper${selectedTag ? ` for ${selectedTag}` : 'Create a Animated Wallpaper'}`;
      const generationPromises = [];

      // Generate multiple variations
      for (let i = 0; i < numberOfVariations; i++) {
        generationPromises.push(generateSingleWallpaper(prompt, selectedTag, i));
      }

      const imageUrls = await Promise.all(generationPromises);
      const wallpapers = imageUrls.map(url => ({
        imageUrl: url,
        type: selectedTag || 'Desktop'
      }));

      // Set progress to 100% and wait a moment
      setProgressPercent(100);
      
      // Wait for progress animation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear states and show generated images
      setIsGenerating(false);
      setProgressPercent(0);
      const currentPrompt = searchInput; // Store current prompt before clearing
      setSearchInput('');
      setSelectedTag('');
      setGeneratedImages({ wallpapers, prompt: currentPrompt });

    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      setProgressPercent(0);
      clearInterval(progressTimer);
    }
  };

  if (generatedImages) {
    return <CreatedSnap 
      wallpapers={generatedImages.wallpapers}
      prompt={generatedImages.prompt}
    />;
  }

  return (
    <div>
      {isGenerating && <CreateSnapProgress progress={progressPercent} />}
      <div className='default-padding'>
        <div className="create-search-container">
          <h1 className="create-search-heading">Generate <span className='bold' ref={el} /></h1>
          <div className="input-container">
            <svg 
              className="search-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="create-search-input"
              placeholder="Describe your Wallpaper"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchInput.trim()) {
                  handleCreate();
                }
              }}
            />
            <button 
              className="create-clear-button"
              onClick={() => {
                setSearchInput('');
                inputRef.current?.focus();
              }}
              type="button"
              aria-label="Clear search"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className={`slash-indicator ${isInputFocused ? 'hidden' : ''}`}>/</div>
          </div>
          
          <div className="create-tags-container">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`create-tag ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <button className="create-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
