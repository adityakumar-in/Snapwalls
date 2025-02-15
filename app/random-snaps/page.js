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
import Login from '/components/Login';

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
    weight: 0.2,
    prompts: [
      "serene mountain landscape with misty peaks and golden sunlight",
      "tranquil forest scene with sunbeams filtering through ancient trees", 
      "dramatic coastal landscape with crashing waves and rugged cliffs",
      "peaceful lake reflection with surrounding autumn trees",
      "ethereal northern lights dancing over snow-covered mountains",
      "lush tropical waterfall in a verdant rainforest",
      "cherry blossom trees in full bloom beside a peaceful stream",
      "desert landscape with rolling sand dunes at sunset",
      "mystical foggy forest with bioluminescent elements",
      "pristine beach with crystal clear turquoise waters",
      "majestic redwood forest canopy with morning mist",
      "alpine meadow filled with wildflowers and distant peaks",
      "volcanic landscape with active lava flows and steam vents",
      "bamboo forest with dappled sunlight and stone path",
      "coral reef underwater scene with tropical fish",
      "ice cave with crystalline formations and blue light",
      "autumn forest with vibrant red and gold leaves",
      "cascading mountain stream with moss-covered rocks",
      "misty valley with rolling hills at dawn",
      "desert oasis with palm trees and clear pool",
      "rocky coastline with lighthouse at stormy sunset",
      "zen garden with raked sand and weathered stones",
      "rainforest canopy view with exotic birds",
      "snow-covered pine forest in soft moonlight",
      "spring meadow with blooming lavender fields"
    ]
  },
  abstract: {
    weight: 0.15,
    prompts: [
      "flowing liquid colors with metallic and iridescent elements",
      "geometric patterns with neon lights and glass effects", 
      "organic shapes with vibrant gradients and smooth transitions",
      "fractal patterns with cosmic elements and deep space colors",
      "minimalist composition with bold shapes and subtle textures",
      "dynamic swirls of color with particle effects",
      "crystalline structures with rainbow light refractions",
      "abstract cityscape with futuristic elements",
      "fluid art with marble textures and gold accents",
      "digital waves with holographic effects",
      "kaleidoscopic patterns with jewel tones and symmetry",
      "abstract smoke art with vivid color transitions",
      "microscopic cellular patterns with vibrant details",
      "topographical maps with colorful elevation layers",
      "sound wave visualizations with neon pulses",
      "abstract ocean waves with pearlescent foam",
      "mathematical patterns with golden ratio spirals",
      "ink drop photography with psychedelic colors",
      "abstract aurora patterns with flowing ribbons",
      "crystalline fractals with prismatic light",
      "bubble art with rainbow iridescence",
      "abstract energy fields with plasma effects",
      "waveform interference patterns with metallic sheen",
      "abstract quantum visualizations with particle trails",
      "marbled paper patterns with floating ink designs"
    ]
  },
  space: {
    weight: 0.15,
    prompts: [
      "nebula with vibrant colors and star clusters",
      "distant galaxies with cosmic dust and stellar formations",
      "planet rise over alien landscape with multiple moons",
      "supernova explosion with spectacular light effects",
      "black hole event horizon with gravitational lensing",
      "space station orbiting a ringed gas giant",
      "asteroid field with distant sun and space phenomena",
      "binary star system with surrounding planetary bodies", 
      "cosmic storm with swirling stellar matter",
      "deep space nebula with star formation regions",
      "pulsar star with electromagnetic beams",
      "colliding galaxies with stellar bridges",
      "planetary nebula with intricate gas clouds",
      "wormhole tunnel with space-time distortions",
      "stellar nursery with young stars forming",
      "quasar jet stream with intense energy beams",
      "mars landscape with earth in the sky",
      "neutron star with intense magnetic fields",
      "cosmic microwave background visualization",
      "interstellar cloud with dark matter effects",
      "dying star with expanding shell of gas",
      "asteroid impact on lunar surface",
      "solar flare eruption with plasma arcs",
      "galactic core with dense star clusters",
      "comet tail with ice crystals and gas"
    ]
  },
  cyberpunk: {
    weight: 0.15,
    prompts: [
      "neon-lit cityscape with flying vehicles and holographic advertisements",
      "cybernetic interface with glowing circuits and data streams", 
      "futuristic metropolis in rain with reflecting neon lights",
      "digital realm with matrix-like elements and cyber aesthetics",
      "retro-futuristic arcade scene with synthwave elements",
      "cyberpunk alley with neon signs and steam vents",
      "virtual reality landscape with grid lines and glitch effects",
      "techno-organic fusion with bioluminescent details",
      "dystopian cityscape with massive holographic displays",
      "cyber-enhanced street scene with robot inhabitants",
      "cyberpunk market with holographic vendor stalls",
      "neon subway station with augmented reality ads",
      "rooftop cyberpunk garden with bioluminescent plants",
      "underground hacker den with matrix displays",
      "cyberpunk laboratory with experimental tech",
      "augmented reality street art in neon city",
      "cybernetic enhancement clinic at night",
      "digital slums with makeshift tech solutions",
      "corporate cyberpunk tower with security drones",
      "neon-soaked back alley with cyber merchants",
      "virtual reality nightclub with digital effects",
      "cyberpunk traffic jam with hovering vehicles",
      "abandoned mall repurposed with cyber tech",
      "cyberpunk medical facility with robot staff",
      "digital marketplace with hologram products",
      "cyberpunk resistance hideout with screens",
      "neon temple with technological artifacts",
      "cyber-enhanced sports arena at night",
      "floating cyberpunk platforms with bridges",
      "underground cyber racing circuit"
    ]
  },
  fantasy: {
    weight: 0.15,
    prompts: [
      "magical crystal cave with glowing minerals",
      "enchanted forest with floating lights and mystical creatures", 
      "ancient dragon temple in misty mountains",
      "fairy tale castle with rainbow aurora in the sky",
      "mystical portal with swirling magical energies",
      "floating islands with waterfalls and crystal formations",
      "phoenix rising with spectacular fire effects",
      "underwater palace with bioluminescent sea life",
      "magical library with floating books and starry ceiling",
      "crystal dragon perched on an ethereal mountain peak",
      "wizard tower with magical experiments and potions",
      "fairy village in giant mushroom forest",
      "mythical creature sanctuary with unicorns and griffins",
      "enchanted garden with magical flowers and butterflies",
      "ancient elven city in treetop canopy",
      "magical oasis with color-changing water",
      "dragon's treasure hoard with magical artifacts",
      "floating magical academy in the clouds",
      "crystal forest with prismatic light effects",
      "magical underground cavern with glowing crystals",
      "enchanted ice palace with aurora effects",
      "mystical ruins with ancient magical symbols",
      "fairy ring with dancing magical lights",
      "magical waterfall with rainbow mist",
      "crystal spire city with magical bridges",
      "enchanted desert with magical mirages",
      "magical storm with swirling elements",
      "ancient magical battlefield with lingering spells",
      "mystical sanctuary with magical creatures",
      "magical nexus with swirling energy vortex"
    ]
  },
  minimal: {
    weight: 0.1,
    prompts: [
      "simple geometric shapes with subtle gradients",
      "minimalist landscape with clean lines and limited palette",
      "zen garden inspired pattern with subtle textures", 
      "abstract minimal composition with floating elements",
      "simple color blocks with organic transitions",
      "minimalist nature scene with fog and silhouettes",
      "clean architectural lines with shadow play",
      "minimal ocean scene with horizon line",
      "geometric pattern with subtle depth and shadows",
      "simplified mountain range with gradient sky",
      "minimalist desert scene with single dune",
      "abstract circles with delicate line work",
      "minimal forest with negative space",
      "geometric cityscape with clean angles",
      "simple wave patterns with subtle motion",
      "minimalist sunset with color bands",
      "abstract minimal shapes in balance",
      "zen stone arrangement with shadows",
      "clean lined architectural facade",
      "minimal winter scene with snow",
      "geometric abstract with single focal point",
      "simple cloud study with gradients",
      "minimalist river scene with reflections",
      "abstract pattern with repeating elements",
      "minimal meadow with single flower",
      "geometric composition with light play",
      "simple moonlit scene with silhouettes",
      "minimalist rain study with lines",
      "abstract landscape with basic shapes",
      "zen inspired minimal composition"
    ]
  },
  anime: {
    weight: 0.1,
    prompts: [
      "anime-style cherry blossom scene with soft lighting",
      "studio ghibli inspired magical forest",
      "anime cityscape with dramatic sky and weather", 
      "japanese shrine with supernatural elements",
      "anime-style cosmic scene with magical effects",
      "detailed anime landscape with fantasy elements",
      "cyberpunk anime city with neon accents",
      "anime beach scene with sunset and waves",
      "magical girl transformation background",
      "anime-style starry night with floating lanterns",
      "anime school rooftop scene at sunset",
      "magical anime library with floating books",
      "anime-style mountain temple in the clouds",
      "futuristic anime mecha hangar",
      "anime hot springs with mystical steam",
      "anime festival scene with paper lanterns",
      "magical anime garden with glowing flowers",
      "anime train scene with passing scenery",
      "cyberpunk anime alleyway with rain",
      "anime-style underwater palace",
      "magical anime forest clearing with spirits",
      "anime sky castle among clouds",
      "traditional japanese room in anime style",
      "anime space station with earth view",
      "magical anime academy courtyard",
      "anime-style autumn scene with falling leaves",
      "mystical anime shrine at night",
      "anime desert oasis with mirages",
      "magical anime crystal cave",
      "anime-style floating islands in sky"
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
    return `${hours<10 ? '0' : ''}${hours}:${minutes}`;
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
      hour: '2-digit',
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

const RATE_LIMIT_DELAY = 2000; // 2 seconds between generations
let lastGenerationTime = 0;
let isGenerating = false;

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
  const [showLogin, setShowLogin] = useState(false);
  const [loginRedirectPath, setLoginRedirectPath] = useState('');
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
  const [history, setHistory] = useState([]);
  const auth = getAuth();

  // Load favorites from Firebase when user auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const favRef = ref(db, `users/${user.uid}/favourites`);
        const historyRef = ref(db, `users/${user.uid}/history`);
        
        // Listen for favorites changes
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          setFavorites(data ? Object.values(data) : []);
        });
        
        // Listen for history changes
        onValue(historyRef, (snapshot) => {
          const data = snapshot.val();
          setHistory(data ? Object.values(data) : []);
        });
      } else {
        setFavorites([]);
        setHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToHistory = async (wallpaper) => {
    if (!auth.currentUser) return;

    try {
      const historyRef = ref(db, `users/${auth.currentUser.uid}/history`);
      
      // Get current history items
      const snapshot = await get(historyRef);
      const historyData = snapshot.val() || {};
      const historyItems = Object.entries(historyData)
        .map(([key, value]) => ({ key, ...value }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // If we have 5 or more items, remove the oldest one
      if (historyItems.length >= 5) {
        const oldestItem = historyItems[historyItems.length - 1];
        await remove(ref(db, `users/${auth.currentUser.uid}/history/${oldestItem.key}`));
      }

      // Add new item
      const newHistoryItem = {
        ...wallpaper,
        timestamp: new Date().toISOString()
      };
      const newItemRef = push(historyRef);
      await set(newItemRef, newHistoryItem);
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  const removeFromHistory = async (wallpaper) => {
    if (!auth.currentUser) return;

    try {
      const historyRef = ref(db, `users/${auth.currentUser.uid}/history`);
      const snapshot = await get(historyRef);
      const data = snapshot.val() || {};
      const keyToRemove = Object.keys(data).find(key => data[key].url === wallpaper.url);
      
      if (keyToRemove) {
        await remove(ref(db, `users/${auth.currentUser.uid}/history/${keyToRemove}`));
      }
    } catch (error) {
      console.error('Error removing from history:', error);
    }
  };

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
    try {
      // Check if generation is already in progress
      if (isGenerating) {
        setError('Please wait for the current generation to complete');
        return;
      }

      // Check rate limiting
      const now = Date.now();
      const timeSinceLastGeneration = now - lastGenerationTime;
      if (timeSinceLastGeneration < RATE_LIMIT_DELAY) {
        setError(`Please wait ${Math.ceil((RATE_LIMIT_DELAY - timeSinceLastGeneration) / 1000)} seconds before generating again`);
        return;
      }

      isGenerating = true;
      lastGenerationTime = now;
      setImageUrl('');
      setImageLoaded(false);
      setLoading(true);
      setError('');
      
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
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Generation timed out')), 60000);
      });

      const url = await Promise.race([
        generatePollinationImage(prompt, dimensions),
        timeoutPromise
      ]);

      if (!url) {
        throw new Error('Failed to generate image URL');
      }

      // Pre-load the image before setting it
      const img = new Image();
      img.src = url;
      
      img.onload = () => {
        setImageUrl(url);
        setImageLoaded(true);
        setLoading(false);
        isGenerating = false; // Reset generating flag
        
        // Add to history after successful generation
        const newHistoryItem = {
          url,
          category: chosenCategory,
          type: wallpaperType,
          quality: selectedQuality,
          style: selectedStyle,
          timestamp: new Date().toISOString()
        };
        addToHistory(newHistoryItem);
      };

      img.onerror = () => {
        console.error('Image failed to load');
        isGenerating = false; // Reset generating flag
        throw new Error('Failed to load generated image');
      };

    } catch (error) {
      console.error('Error in handleGenerateImage:', error);
      setError(error.message || 'Failed to generate image. Please try again.');
      setLoading(false);
      setImageLoaded(false);
      isGenerating = false; // Reset generating flag
    }
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
    if (!auth.currentUser) {
      setLoginRedirectPath('/random-snaps');
      setShowLogin(true);
      return;
    }
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
    
    // Calculate the drawer position from bottom of screen
    const windowHeight = window.innerHeight;
    const drawerFullHeight = drawerRef.current.offsetHeight;
    
    // Convert deltaY to percentage of drawer height (0 to 100)
    const currentTransform = getComputedStyle(drawerRef.current).transform;
    const currentY = currentTransform === 'none' ? drawerFullHeight : parseInt(currentTransform.split(',')[5]);
    
    // Calculate new position with boundaries
    let newY = Math.max(0, Math.min(drawerFullHeight, currentY + deltaY));
    
    // Update start position for next move event
    startYRef.current = touch.clientY;
    
    // Apply the transform immediately
    if (drawerRef.current) {
      drawerRef.current.style.transform = `translateY(${newY}px)`;
      
      // Update classes based on position
      if (newY < drawerFullHeight * 0.3) {
        drawerRef.current.classList.add('fully-expanded');
      } else {
        drawerRef.current.classList.remove('fully-expanded');
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || !drawerRef.current) return;

    // Re-enable transitions
    drawerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    drawerRef.current.classList.remove('dragging');
    
    const currentTransform = getComputedStyle(drawerRef.current).transform;
    const currentY = currentTransform === 'none' ? 0 : parseInt(currentTransform.split(',')[5]);
    const drawerHeight = drawerRef.current.offsetHeight;

    // Define snap points as percentages of drawer height
    const snapPoints = [
      0, // Fully expanded
      drawerHeight * 0.3, // Partially expanded
      drawerHeight * 0.7, // Minimized
      drawerHeight // Fully closed
    ];

    // Find nearest snap point
    const closest = snapPoints.reduce((prev, curr) => {
      return (Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev);
    });

    // Snap to position
    drawerRef.current.style.transform = `translateY(${closest}px)`;
    
    // Update gallery open state
    if (closest >= drawerHeight * 0.7) {
      setIsGalleryOpen(false);
    } else {
      setIsGalleryOpen(true);
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

  const handleDeleteItem = async (item, isHistoryItem) => {
    if (isHistoryItem) {
      removeFromHistory(item);
    } else {
      try {
        // Remove from Firebase
        const favRef = ref(db, `users/${auth.currentUser.uid}/favourites`);
        const snapshot = await get(favRef);
        const data = snapshot.val() || {};
        const keyToRemove = Object.keys(data).find(key => data[key].url === item.url);
        if (keyToRemove) {
          await remove(ref(db, `users/${auth.currentUser.uid}/favourites/${keyToRemove}`));
        }
      } catch (error) {
        console.error('Error removing favorite:', error);
        // You might want to show this error to the user through a toast notification
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

  const handleFavoriteClick = (wallpaper) => {
    if (!auth.currentUser) {
      setLoginRedirectPath('/random-snaps');
      setShowLogin(true);
      return;
    }
    toggleFavorite(wallpaper);
  };

  return (
    <div className='default-padding'>
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          currentPath={loginRedirectPath}
        />
      )}
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
              disabled={loading || (imageUrl && !imageLoaded) || isGenerating}
              className='generate-button'
              title="Press 'G' to generate"
            >
              {loading ? 'Creating Magic...' : 
               isGenerating ? 'Please Wait...' : 
               'Generate Random Wallpaper'}
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
                      onClick={() => handleFavoriteClick({ 
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
                  onFavorite={() => handleFavoriteClick({ 
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
                onError={() => {
                  console.error('Image failed to load in component');
                  setError('Failed to load image. Please try again.');
                  setLoading(false);
                  setImageLoaded(false);
                }}
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
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
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
          style={{ display: isGalleryOpen ? 'block' : 'none' }}
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
