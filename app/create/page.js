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
  const [generatedImage, setGeneratedImage] = useState(null);


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
    setSelectedTag(tag);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    
    const matchingTag = tags.find(
      tag => tag.toLowerCase() === newValue.toLowerCase()
    );
    setSelectedTag(matchingTag || '');
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
      
      const imageUrl = await generatePollinationImage(prompt, {
        width: selectedTag === 'Mobile' ? 720 : selectedTag === '' ? window.innerWidth : 1280,
        height: selectedTag === 'Mobile' ? 1280 : selectedTag === '' ? window.innerHeight : 720,
        model: 'flux'
      });

      // Create a new image object to ensure it's fully loaded
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Set progress to 100% and wait a moment
      setProgressPercent(100);
      
      // Wait for progress animation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear states and show generated image
      setIsGenerating(false);
      setProgressPercent(0);
      setSearchInput('');
      setSelectedTag('');
      setGeneratedImage({ imageUrl, selectedTag });

    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      setProgressPercent(0);
      clearInterval(progressTimer);
    }
  };

  // Add this log before the conditional render

  if (generatedImage) {
    return <CreatedSnap 
      imageUrl={generatedImage.imageUrl} 
      selectedTag={generatedImage.selectedTag} 
    />;
  }

  return (
    <div>
      {isGenerating && <CreateSnapProgress progress={progressPercent} />}
      <div className='default-padding'>
        <div className="create-search-container">
          <h1 className="create-search-heading">Generate <span className='bold' ref={el} /></h1>
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              className="create-search-input"
              placeholder="Describe your Wallpaper"
              value={searchInput}
              onChange={handleInputChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
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
