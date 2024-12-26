'use client';

// Suppress hydration warnings in development
const originalError = console.error;
if (process.env.NODE_ENV === 'development') {
  console.error = (...args) => {
    if (args[0]?.includes('Warning: Text content did not match')) return;
    if (args[0]?.includes('Warning: An error occurred during hydration')) return;
    originalError.call(console, ...args);
  };
}

import React, { useState, useEffect, useRef } from 'react'
import { generatePollinationImage } from '@/utils/pollinations'
import '/app/styles/randomSnaps.css'
import { createPortal } from 'react-dom';
import { db } from '/components/firebase.config';
import { getAuth } from 'firebase/auth';
import { ref, set, get, onValue, push, update, remove } from 'firebase/database';

const QUALITY_PRESETS = {
  standard: {
    label: 'Standard',
    modifiers: 'high quality, sharp focus'
  },
  ultra: {
    label: 'Ultra HD',
    modifiers: 'ultra detailed, ultra HD, 4k quality, crystal clear, masterpiece, sharp focus, professional quality'
  },
  cinematic: {
    label: 'Cinematic',
    modifiers: 'cinematic lighting, dramatic atmosphere, professional photography, high budget production quality'
  }
};

const STYLE_PRESETS = {
  default: {
    label: 'Default',
    modifiers: ''
  },
  vibrant: {
    label: 'Vibrant',
    modifiers: 'vibrant colors, high contrast, dynamic lighting'
  },
  moody: {
    label: 'Moody',
    modifiers: 'moody atmosphere, dark tones, dramatic shadows'
  },
  dreamy: {
    label: 'Dreamy',
    modifiers: 'soft lighting, dreamy atmosphere, ethereal glow'
  },
  minimal: {
    label: 'Minimal',
    modifiers: 'minimalist style, clean composition, simple elegance'
  }
};

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

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef(null);
  const selectedOption = options.find(opt => opt.value === value) || options[0];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Close other dropdowns by dispatching a custom event
      const event = new CustomEvent('closeOtherDropdowns', { detail: { currentSelect: selectRef.current } });
      document.dispatchEvent(event);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Listen for close events from other dropdowns
  useEffect(() => {
    const handleCloseOthers = (event) => {
      if (event.detail.currentSelect !== selectRef.current) {
        setIsOpen(false);
      }
    };

    document.addEventListener('closeOtherDropdowns', handleCloseOthers);
    return () => {
      document.removeEventListener('closeOtherDropdowns', handleCloseOthers);
    };
  }, []);

  const updateDropdownPosition = () => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const idealHeight = Math.min(280, options.length * 40);

      if (isMobile) {
        // For mobile, position in the middle of the screen
        setDropdownPosition({
          top: `${Math.min(rect.bottom + 8, window.innerHeight - idealHeight - 20)}px`,
          left: '50%',
          width: `${Math.min(rect.width, window.innerWidth - 32)}px`
        });
      } else {
        // For desktop, position relative to the select
        let top;
        if (spaceBelow >= idealHeight || spaceBelow >= spaceAbove) {
          top = rect.bottom + 8;
        } else {
          top = rect.top - idealHeight - 8;
        }

        setDropdownPosition({
          top: `${top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
        });
      }
    }
  };

  const handleTriggerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue, e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(optionValue);
    setIsOpen(false);
  };

  // Update position on scroll or resize
  useEffect(() => {
    if (isOpen) {
      const handleUpdate = () => {
        updateDropdownPosition();
      };

      window.addEventListener('scroll', handleUpdate, true);
      window.addEventListener('resize', handleUpdate);

      return () => {
        window.removeEventListener('scroll', handleUpdate, true);
        window.removeEventListener('resize', handleUpdate);
      };
    }
  }, [isOpen]);

  return (
    <div 
      className={`custom-select ${isOpen ? 'open' : ''}`} 
      ref={selectRef}
    >
      <button
        type="button"
        className={`select-trigger ${isOpen ? 'open' : ''}`}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg className="select-arrow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      </button>

      {isOpen && (
        <div 
          className="select-options"
          role="listbox"
          aria-label={placeholder}
          style={{
            top: dropdownPosition.top,
            width: dropdownPosition.width,
            transform: isMobile ? 'translateX(-50%)' : 'none'
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`select-option ${option.value === value ? 'selected' : ''}`}
              onClick={(e) => handleOptionClick(option.value, e)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Time and Date Display Component
const PhoneTimeDisplay = () => {
  const [mounted, setMounted] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Don't render anything until mounted (client-side)
  if (!mounted) {
    return null;
  }

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="phone-time-display">
      <div className="phone-date">{formatDate(dateTime)}</div>
      <div className="phone-time">{formatTime(dateTime)}</div>
    </div>
  );
};

// Add this component after PhoneTimeDisplay
const DesktopFrame = ({ imageUrl, onDownload, onShare, onFavorite, isFavorite, imageLoaded }) => {
  const [mounted, setMounted] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <div className="desktop-menubar">
        <div className="desktop-menubar-left">
          <span className="desktop-apple-logo"></span>
          <div className="desktop-menu-items">
            <span>Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>
        </div>
        <div className="desktop-menubar-right">
          <div className="desktop-status-icons">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
            </svg>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
          </div>
          <div className="desktop-time">
            {formatTime(dateTime)}
          </div>
        </div>
      </div>
      {imageLoaded && (
        <div className="desktop-dock">
          <div className="dock-icon finder">
            <img src="/macos-finder.png" alt="Finder" />
            <span className="dock-tooltip">Finder</span>
          </div>
          <div className="dock-icon settings">
            <img src="/macos-settings.png" alt="System Settings" />
            <span className="dock-tooltip">System Settings</span>
          </div>
          <div className="dock-icon launchpad">
            <svg viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="10" height="10" rx="2" fill="#FF9800"/>
              <rect x="18" y="4" width="10" height="10" rx="2" fill="#4CAF50"/>
              <rect x="4" y="18" width="10" height="10" rx="2" fill="#F44336"/>
              <rect x="18" y="18" width="10" height="10" rx="2" fill="#2196F3"/>
            </svg>
            <span className="dock-tooltip">Launchpad</span>
          </div>
          <div className="dock-divider"></div>
          <div className="dock-icon download" onClick={onDownload} title="Download">
            <img src="/macos-download.png" alt="Download" />
            <span className="dock-tooltip">Download Wallpaper</span>
          </div>
          <div className="dock-icon share" onClick={onShare} title="Share">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
            </svg>
            <span className="dock-tooltip">Share Wallpaper</span>
          </div>
          <div className={`dock-icon favorite ${isFavorite ? 'active' : ''}`} onClick={onFavorite} title="Favorite">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d={isFavorite 
                ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}
              />
            </svg>
            <span className="dock-tooltip">Add to Favorites</span>
          </div>
          <div className="dock-divider"></div>
          <div className="dock-icon trash">
            <img src="/macos-trash.png" alt="Trash" />
            <span className="dock-tooltip">Trash</span>
          </div>
        </div>
      )}
    </>
  );
};

// Add this custom hook before the Page component
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Add this new component before the Page component
const GalleryCounts = ({ favorites, history }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="gallery-counts">
      <span className="favorite-count">{favorites.length}</span>
      <span className="history-count">{history.length}</span>
    </div>
  );
};

// Add this new component before the Page component
const ClientOnly = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return children;
};

const Page = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [wallpaperType, setWallpaperType] = useState('desktop');
  const [currentCategory, setCurrentCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('random');
  const [selectedQuality, setSelectedQuality] = useState('ultra');
  const [selectedStyle, setSelectedStyle] = useState('default');
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [drawerHeight, setDrawerHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const drawerRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const containerRef = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(null);
  const currentYRef = useRef(null);
  const lastPositionRef = useRef(0);

  // Replace the useState and useEffect for favorites with Firebase and keep history in localStorage
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useLocalStorage('wallpaperHistory', []);
  const auth = getAuth();

  // Load favorites from Firebase when user auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const favRef = ref(db, `users/${user.uid}/favourites`);
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          setFavorites(data ? Object.values(data) : []);
        });
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (wallpaper) => {
    if (!auth.currentUser) {
      setError('Please sign in to save favorites');
      return;
    }

    try {
      const favRef = ref(db, `users/${auth.currentUser.uid}/favourites`);
      const isFavorite = favorites.some(fav => fav.url === wallpaper.url);

      if (isFavorite) {
        // Remove from favorites
        const snapshot = await get(favRef);
        const data = snapshot.val() || {};
        const keyToRemove = Object.keys(data).find(key => data[key].url === wallpaper.url);
        if (keyToRemove) {
          await remove(ref(db, `users/${auth.currentUser.uid}/favourites/${keyToRemove}`));
        }
      } else {
        // Add to favorites
        const newFavorite = {
          ...wallpaper,
          timestamp: new Date().toISOString()
        };
        const newFavRef = push(favRef);
        await set(newFavRef, newFavorite);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
      setError('Failed to update favorites. Please try again.');
    }
  };

  // Handle body scroll lock when gallery is open
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isGalleryOpen]);

  useEffect(() => {
    if (drawerRef.current) {
      setDrawerHeight(drawerRef.current.clientHeight);
    }
  }, [isGalleryOpen]);

  useEffect(() => {
    if (drawerRef.current) {
      const height = drawerRef.current.clientHeight;
      setMaxDrag(-height + 100); // Leave 100px at the top
    }
  }, [isGalleryOpen]);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartY.current = touch.clientY;
    touchEndY.current = touch.clientY;
    setIsDragging(true);
    setDragPosition(0);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    touchEndY.current = touch.clientY;
    
    const deltaY = touch.clientY - touchStartY.current;
    
    // If drawer is open, allow dragging down
    if (isGalleryOpen) {
      if (deltaY > 0) { // Dragging down
        setDragPosition(deltaY);
      }
    } else {
      // If drawer is closed, allow dragging up
      if (deltaY < 0) { // Dragging up
        setDragPosition(deltaY);
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStartY.current || !touchEndY.current || !isDragging) return;
    
    const distance = touchStartY.current - touchEndY.current;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;
    const dragThreshold = drawerHeight * 0.3; // 30% of drawer height
    
    if (!isGalleryOpen && (isUpSwipe || Math.abs(dragPosition) > dragThreshold)) {
      setIsGalleryOpen(true);
    } else if (isGalleryOpen && (isDownSwipe || dragPosition > dragThreshold)) {
      setIsGalleryOpen(false);
    }
    
    touchStartY.current = null;
    touchEndY.current = null;
    setIsDragging(false);
    setDragPosition(0);
  };

  const getWallpaperDimensions = () => {
    return wallpaperType === 'desktop' 
      ? { width: 1920, height: 1080 }
      : { width: 1440, height: 2736 };
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
    
    return Object.keys(WALLPAPER_CATEGORIES)[0];
  };

  const getRandomPrompt = (category) => {
    const prompts = WALLPAPER_CATEGORIES[category].prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleGenerateImage = async () => {
    setImageUrl('');
    setImageLoaded(false);
    setLoading(true);
    setError('');
    
    try {
      const dimensions = getWallpaperDimensions();
      const chosenCategory = selectedCategory === 'random' ? getRandomCategory() : selectedCategory;
      setCurrentCategory(chosenCategory);
      const basePrompt = getRandomPrompt(chosenCategory);
      
      const qualityModifiers = QUALITY_PRESETS[selectedQuality].modifiers;
      const styleModifiers = STYLE_PRESETS[selectedStyle].modifiers;
      
      const orientationModifiers = wallpaperType === 'phone' 
        ? 'perfect vertical composition, mobile wallpaper style, vertical format'
        : 'perfect horizontal composition, desktop wallpaper style, wide format';
      
      const prompt = `${basePrompt}, ${styleModifiers}, ${orientationModifiers}, ${qualityModifiers} --no blur, noise, pixelation, low quality, text, watermark, artifacts, distortion`;
      
      const url = await generatePollinationImage(prompt, dimensions);
      setImageUrl(url);

      // Add to history using the setter function from useLocalStorage
      const newHistoryItem = {
        url,
        category: chosenCategory,
        type: wallpaperType,
        quality: selectedQuality,
        style: selectedStyle,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prevHistory => {
        const newHistory = [newHistoryItem, ...prevHistory].slice(0, 12);
        return newHistory;
      });

    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
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
      link.download = `wallpaper-${currentCategory}-${wallpaperType}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      setError('Failed to download image. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My AI Generated Wallpaper',
          text: `Check out this amazing ${currentCategory} wallpaper I generated!`,
          url: imageUrl
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setError('Failed to share image. Please try again.');
    }
  };

  const handleGalleryToggle = () => {
    setIsGalleryOpen(true);
    // Reset any transform styles when opening
    if (drawerRef.current) {
      drawerRef.current.style.transform = '';
    }
  };

  const handleTouchStart = (e) => {
    // Only allow dragging from the header or handle
    if (!e.target.closest('.bottom-sheet-header, .bottom-sheet-handle')) return;

    const touch = e.touches[0];
    isDraggingRef.current = true;
    startYRef.current = touch.clientY;

    // Disable transitions while dragging
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'none';
      drawerRef.current.classList.add('dragging');
    }
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    
    // Get current position
    const currentTransform = getComputedStyle(drawerRef.current).transform;
    const currentY = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[5]);
    
    // Calculate new position
    let newY = Math.max(0, Math.min(drawerHeight * 0.7, deltaY));
    
    // Apply the transform
    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${newY}px)`;
      
      // Add or remove fully-expanded class based on position
      if (newY < drawerHeight * 0.3) {
        drawerRef.current.classList.add('fully-expanded');
      } else {
        drawerRef.current.classList.remove('fully-expanded');
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;

    // Re-enable transitions
    if (drawerRef.current) {
      drawerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      drawerRef.current.classList.remove('dragging');
      
      const currentTransform = getComputedStyle(drawerRef.current).transform;
      const currentY = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[5]);

      // Only close if dragged down significantly
      if (currentY > drawerHeight * 0.5) {
        setIsGalleryOpen(false);
        drawerRef.current.style.transform = 'translateY(100%)';
      } else {
        // Stay at current position or snap to nearest point
        const snapPoints = [0, drawerHeight * 0.3, drawerHeight * 0.7];
        const closest = snapPoints.reduce((prev, curr) => {
          return (Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev);
        });
        drawerRef.current.style.transform = `translateY(${closest}px)`;
      }
    }

    isDraggingRef.current = false;
    startYRef.current = null;
  };

  const handleCloseDrawer = () => {
    setIsGalleryOpen(false);
    if (drawerRef.current) {
      drawerRef.current.style.transform = 'translateY(100%)';
    }
  };

  const handleHandleClick = (e) => {
    // If clicking the handle or header, close the drawer
    if (e.target.closest('.bottom-sheet-handle')) {
      handleCloseDrawer();
    }
  };

  const handleDeleteItem = (item, isHistoryItem) => {
    if (isHistoryItem) {
      setHistory(prevHistory => prevHistory.filter(h => h.timestamp !== item.timestamp));
    } else {
      // Remove from Firebase
      const favRef = ref(db, `users/${auth.currentUser.uid}/favourites`);
      const snapshot = get(favRef);
      const data = snapshot.val() || {};
      const keyToRemove = Object.keys(data).find(key => data[key].url === item.url);
      if (keyToRemove) {
        remove(ref(db, `users/${auth.currentUser.uid}/favourites/${keyToRemove}`));
      }
    }
  };

  const handleGalleryItemTouch = (e) => {
    const item = e.currentTarget;
    item.classList.add('touched');
    
    const handleTouchEnd = () => {
      setTimeout(() => {
        item.classList.remove('touched');
      }, 3000); // Hide info after 3 seconds
      item.removeEventListener('touchend', handleTouchEnd);
    };
    
    item.addEventListener('touchend', handleTouchEnd);
  };

  const handleGalleryItemAction = (item) => {
    setImageUrl(item.url);
    setCurrentCategory(item.category);
    setWallpaperType(item.type);
    setSelectedQuality(item.quality);
    setSelectedStyle(item.style);
    setImageLoaded(true);
    handleCloseDrawer(); // Use handleCloseDrawer instead of just setting isGalleryOpen
  };

  const handleDesktopImageTouch = (e) => {
    const wrapper = e.currentTarget;
    wrapper.classList.add('touched');
    
    const handleTouchEnd = () => {
      setTimeout(() => {
        wrapper.classList.remove('touched');
      }, 3000); // Hide dock after 3 seconds
      wrapper.removeEventListener('touchend', handleTouchEnd);
    };
    
    wrapper.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className='default-padding'>
      <div 
        ref={containerRef}
        className='random-snaps-container'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h1>AI Wallpaper Generator</h1>
        
        <div className='controls'>
          <div className='control-group'>
            <div className='wallpaper-type' data-active={wallpaperType}>
              <button 
                className={`type-button ${wallpaperType === 'desktop' ? 'active' : ''}`}
                onClick={() => setWallpaperType('desktop')}
                title="Press 'T' to toggle"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
                </svg>
                <span>Desktop</span>
              </button>
              <button 
                className={`type-button ${wallpaperType === 'phone' ? 'active' : ''}`}
                onClick={() => setWallpaperType('phone')}
                title="Press 'T' to toggle"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                </svg>
                <span>Mobile</span>
              </button>
            </div>

            <div className="select-group">
              <CustomSelect
                options={[
                  { value: 'random', label: 'Random Category' },
                  ...Object.keys(WALLPAPER_CATEGORIES).map(category => ({
                    value: category,
                    label: category.charAt(0).toUpperCase() + category.slice(1)
                  }))
                ]}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Random Category"
              />

              <CustomSelect
                options={Object.entries(QUALITY_PRESETS).map(([key, { label }]) => ({
                  value: key,
                  label
                }))}
                value={selectedQuality}
                onChange={setSelectedQuality}
                placeholder="Select Quality"
              />

              <CustomSelect
                options={Object.entries(STYLE_PRESETS).map(([key, { label }]) => ({
                  value: key,
                  label
                }))}
                value={selectedStyle}
                onChange={setSelectedStyle}
                placeholder="Select Style"
              />
            </div>
          </div>
          
          <div className="controls-bottom">
            <button 
              onClick={handleGenerateImage}
              disabled={loading}
              className='generate-button'
              title="Press 'G' to generate"
            >
              {loading ? 'Creating Magic...' : 'Generate Random Wallpaper'}
            </button>

            <button 
              onClick={handleGalleryToggle}
              className="gallery-toggle-btn"
              title="View Gallery"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
              </svg>
              <GalleryCounts favorites={favorites} history={history} />
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className={`image-container ${wallpaperType}`}>
          {loading && (
            <div className={wallpaperType === 'desktop' ? 'desktop-skeleton-container' : 'skeleton-container'}>
              {wallpaperType === 'phone' && (
                <>
                  <div className="notch"></div>
                  <PhoneTimeDisplay />
                </>
              )}
              {wallpaperType === 'desktop' && <DesktopFrame imageLoaded={false} />}
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
            <div 
              className={`image-wrapper ${imageLoaded ? 'loaded' : ''}`}
              onTouchStart={wallpaperType === 'desktop' ? handleDesktopImageTouch : undefined}
            >
              {wallpaperType === 'phone' && (
                <>
                  <div className="notch"></div>
                  <PhoneTimeDisplay />
                  <div className="image-actions">
                    <button 
                      className="random-snap-action-btn download-btn" 
                      onClick={handleDownload}
                      title="Download Wallpaper"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      <span>Download</span>
                    </button>
                    <button 
                      className="random-snap-action-btn" 
                      onClick={handleShare}
                      title="Share Wallpaper"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
                      </svg>
                      <span>Share</span>
                    </button>
                    <button 
                      className={`random-snap-action-btn favorite-btn ${favorites.some(fav => fav.url === imageUrl) ? 'active' : ''}`}
                      onClick={() => toggleFavorite({ 
                        url: imageUrl, 
                        category: currentCategory, 
                        type: wallpaperType, 
                        quality: selectedQuality, 
                        style: selectedStyle 
                      })}
                      title="Add to Favorites"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d={favorites.some(fav => fav.url === imageUrl)
                          ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}
                        />
                      </svg>
                      <span>Favorite</span>
                    </button>
                  </div>
                </>
              )}
              {wallpaperType === 'desktop' && (
                <DesktopFrame 
                  imageUrl={imageUrl}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  onFavorite={() => toggleFavorite({ 
                    url: imageUrl, 
                    category: currentCategory, 
                    type: wallpaperType, 
                    quality: selectedQuality, 
                    style: selectedStyle 
                  })}
                  isFavorite={favorites.some(fav => fav.url === imageUrl)}
                  imageLoaded={imageLoaded}
                />
              )}
              <img 
                src={imageUrl} 
                alt={`Generated ${currentCategory} wallpaper`}
                className='generated-image'
                onLoad={handleImageLoad}
              />
            </div>
          )}
          {!loading && !imageUrl && (
            <div className={wallpaperType === 'desktop' ? 'desktop-skeleton-container empty' : 'skeleton-container empty'}>
              {wallpaperType === 'phone' && (
                <>
                  <div className="notch"></div>
                  <PhoneTimeDisplay />
                </>
              )}
              {wallpaperType === 'desktop' && <DesktopFrame imageLoaded={false} />}
              <div className="placeholder-text">Click 'Generate' to Create Random Wallpaper</div>
            </div>
          )}
        </div>

        {/* Gallery Drawer/Modal for larger screens */}
        <div className={`gallery-drawer ${isGalleryOpen ? 'open' : ''}`}>
          <div className="gallery-drawer-header">
            <div className="gallery-tabs">
              <button 
                className={`gallery-tab ${!showHistory ? 'active' : ''}`}
                onClick={() => setShowHistory(false)}
              >
                Favorites ({favorites.length})
              </button>
              <button 
                className={`gallery-tab ${showHistory ? 'active' : ''}`}
                onClick={() => setShowHistory(true)}
              >
                History ({history.length})
              </button>
            </div>
            <button 
              className="gallery-close-btn"
              onClick={() => setIsGalleryOpen(false)}
              title="Close Gallery"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="gallery-drawer-content">
            <div className="gallery-grid">
              {(showHistory ? history : favorites).map((item, index) => (
                <div 
                  key={item.timestamp} 
                  className="gallery-item"
                  onTouchStart={handleGalleryItemTouch}
                >
                  <img src={item.url} alt={`${item.category} wallpaper`} />
                  <div className="gallery-item-info">
                    <div className="gallery-item-details">
                      <div className="category">{item.category}</div>
                      <div className="type">{item.type}</div>
                      <div className="timestamp">
                        {new Date(item.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="gallery-item-actions">
                      <button 
                        onClick={() => handleGalleryItemAction(item)}
                        className="gallery-action-btn"
                        title="Use this wallpaper"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                      </button>
                      {!showHistory && (
                        <button 
                          onClick={() => handleDeleteItem(item, false)}
                          className="gallery-action-btn remove"
                          title="Remove from favorites"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      )}
                      {showHistory && (
                        <button 
                          onClick={() => handleDeleteItem(item, true)}
                          className="gallery-action-btn remove"
                          title="Remove from history"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Gallery Backdrop */}
        <div 
          className={`gallery-backdrop ${isGalleryOpen ? 'open' : ''}`}
          onClick={handleCloseDrawer}
          style={{ display: 'none' }}  // Will be shown via CSS media query
        />

        {/* Mobile Gallery Bottom Sheet */}
        <div 
          ref={drawerRef}
          className={`gallery-bottom-sheet ${isGalleryOpen ? 'open' : ''}`}
          onTouchStart={(e) => {
            // Only start dragging if clicking the header or handle
            if (e.target.closest('.bottom-sheet-header, .bottom-sheet-handle')) {
              handleTouchStart(e);
            }
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            // Prevent clicks from propagating to the backdrop
            e.stopPropagation();
            handleHandleClick(e);
          }}
        >
          <div className="bottom-sheet-header">
            <div className="swipe-indicator">
              <svg className="swipe-indicator-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
              </svg>
              <span>Swipe up to view gallery</span>
            </div>
            <div className="swipe-down-indicator">
              <svg className="swipe-down-indicator-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
              </svg>
              <span>Swipe down to minimize</span>
            </div>
            <div className="gallery-tabs">
              <button 
                className={`gallery-tab ${!showHistory ? 'active' : ''}`}
                onClick={() => setShowHistory(false)}
              >
                Favorites ({favorites.length})
              </button>
              <button 
                className={`gallery-tab ${showHistory ? 'active' : ''}`}
                onClick={() => setShowHistory(true)}
              >
                History ({history.length})
              </button>
            </div>
          </div>

          <div className="bottom-sheet-content">
            <div className="gallery-grid">
              {/* Same gallery items as above */}
              {(showHistory ? history : favorites).map((item, index) => (
                <div 
                  key={item.timestamp} 
                  className="gallery-item"
                  onTouchStart={handleGalleryItemTouch}
                >
                  <img src={item.url} alt={`${item.category} wallpaper`} />
                  <div className="gallery-item-info">
                    <div className="gallery-item-details">
                      <div className="category">{item.category}</div>
                      <div className="type">{item.type}</div>
                      <div className="timestamp">
                        {new Date(item.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="gallery-item-actions">
                      <button 
                        onClick={() => handleGalleryItemAction(item)}
                        className="gallery-action-btn"
                        title="Use this wallpaper"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                      </button>
                      {!showHistory && (
                        <button 
                          onClick={() => handleDeleteItem(item, false)}
                          className="gallery-action-btn remove"
                          title="Remove from favorites"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      )}
                      {showHistory && (
                        <button 
                          onClick={() => handleDeleteItem(item, true)}
                          className="gallery-action-btn remove"
                          title="Remove from history"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrap the Page component with ClientOnly
const RandomSnapsPage = () => {
  return (
    <ClientOnly>
      <Page />
    </ClientOnly>
  );
};

export default RandomSnapsPage;
