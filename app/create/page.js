'use client'
import React, { useEffect, useState, useRef } from 'react'
import Typed from 'typed.js';
import { getAuth } from 'firebase/auth';
import '/app/styles/create.css';
import { useRouter } from 'next/navigation';
import { generatePollinationImage } from '/utils/pollinations';
import CreateSnapProgress from '@/components/CreateSnapProgress';

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
    console.log('Create button clicked');
    
    if (!user) {
      console.log('User not authenticated');
      return;
    }
    if (!searchInput.trim()) {
      console.log('Search input is empty');
      return;
    }

    // Clear browser cache for pollinations.ai domain
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
        console.log('Cache cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }

    setIsGenerating(true);
    setProgressPercent(0);
    console.log('Starting generation with:', { searchInput, selectedTag });
    
    // Progress animation
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
      console.log('Generated prompt:', prompt);
      
      const imageUrl = await generatePollinationImage(prompt, {
        width: selectedTag === 'Mobile' ? 720 : selectedTag === '' ? window.innerWidth : 1280,
        height: selectedTag === 'Mobile' ? 1280 : selectedTag === '' ? window.innerHeight : 720,
        seed: 42,
        model: 'flux'
      });
      console.log('Generated image URL:', imageUrl);
    
      // Complete the progress
      setProgressPercent(100);
      
      setIsGenerating(false);
      setProgressPercent(0);
      setSearchInput('');
      setSelectedTag('');
      
      // Navigate with URL parameters
      router.push(`/create/snap?imageUrl=${encodeURIComponent(imageUrl)}&selectedTag=${encodeURIComponent(selectedTag || '')}`);
      
    } catch (error) {
      console.error('Generation error:', error);
      setIsGenerating(false);
      setProgressPercent(0);
    }
  };

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
