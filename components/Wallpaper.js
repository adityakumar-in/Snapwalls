'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '@/app/styles/wallpaper.css';
import WallpaperCard from './WallpaperCard';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const Wallpaper = ({ selectedFilter = 'all' }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allImageRefs, setAllImageRefs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(2);
  const [batchSize, setBatchSize] = useState(20);
  const [bufferImages, setBufferImages] = useState([]); // Buffer for preloaded images
  const [preloadingBatchCount, setPreloadingBatchCount] = useState(3); // Number of batches to preload
  const [usedImageIndices, setUsedImageIndices] = useState(new Set());
  const observerTarget = useRef(null);

  // Clear cache when component mounts and set up cleanup
  useEffect(() => {
    // Clear any stale cache on mount
    const staleKeys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith('wallpaper_')) {
        staleKeys.push(key);
      }
    }
    staleKeys.forEach(key => sessionStorage.removeItem(key));

    // Set up cache cleanup on window close
    const handleUnload = () => {
      const cacheKeys = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith('wallpaper_')) {
          cacheKeys.push(key);
        }
      }
      cacheKeys.forEach(key => sessionStorage.removeItem(key));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      handleUnload(); // Clean up cache when component unmounts
    };
  }, []);

  // Fetch all image references initially
  useEffect(() => {
    const fetchImageRefs = async () => {
      setLoading(true);
      try {
        const storageRef = ref(storage, '/'); 
        
        const result = await listAll(storageRef);
        
        setAllImageRefs(result.items);
        if (result.items.length > 0) {
          loadMoreImages(result.items, 0);
        } else {
          setError('No images found in storage');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageRefs();
  }, []);

  // Function to get random unused indices
  const getRandomUnusedIndices = (refs, count) => {
    const availableIndices = [];
    for (let i = 0; i < refs.length; i++) {
      if (!usedImageIndices.has(i)) {
        availableIndices.push(i);
      }
    }
    
    const selectedIndices = [];
    while (selectedIndices.length < count && availableIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      selectedIndices.push(availableIndices[randomIndex]);
      availableIndices.splice(randomIndex, 1);
    }
    
    return selectedIndices;
  };

  // Function to load more images
  const loadMoreImages = async (refs, startIndex) => {
    if (loading || refs.length === 0) return;

    setLoading(true);
    try {
      const totalItemsToLoad = batchSize * preloadingBatchCount;
      const randomIndices = getRandomUnusedIndices(refs, totalItemsToLoad);
      
      if (randomIndices.length === 0) {
        // Reset used indices if we've shown all images
        setUsedImageIndices(new Set());
        return loadMoreImages(refs, 0);
      }

      const newImagesPromises = randomIndices.map(async (index) => {
        const imageRef = refs[index];
        try {
          const fileName = imageRef.name.toLowerCase();
          const cacheKey = `wallpaper_${fileName}`;
          
          // Check cache with timestamp validation
          const cachedData = sessionStorage.getItem(cacheKey);
          let url;
          
          if (cachedData) {
            const { url: cachedUrl, timestamp } = JSON.parse(cachedData);
            const cacheAge = Date.now() - timestamp;
            const maxCacheAge = 30 * 60 * 1000; // 30 minutes

            if (cacheAge < maxCacheAge) {
              url = cachedUrl;
            } else {
              url = await getDownloadURL(imageRef);
              sessionStorage.setItem(cacheKey, JSON.stringify({
                url,
                timestamp: Date.now()
              }));
            }
          } else {
            url = await getDownloadURL(imageRef);
            sessionStorage.setItem(cacheKey, JSON.stringify({
              url,
              timestamp: Date.now()
            }));
          }
          
          const type = fileName.includes('desktop') || 
                      fileName.includes('landscape') ? 'desktop' : 'phone';
          
          return {
            url,
            type,
            index
          };
        } catch (error) {
          console.error(`Error loading image ${imageRef.name}:`, error);
          return null;
        }
      });

      const newImages = (await Promise.all(newImagesPromises)).filter(img => img !== null);
      
      // Update used indices
      setUsedImageIndices(prev => {
        const newSet = new Set(prev);
        newImages.forEach(img => newSet.add(img.index));
        return newSet;
      });

      setImages(prevImages => [...prevImages, ...newImages]);

      // If we still have unused images, trigger the next batch automatically
      if (usedImageIndices.size < refs.length) {
        setTimeout(() => {
          loadMoreImages(refs, 0);
        }, 1000);
      }
    } catch (error) {
      console.error('Error loading more images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to determine column count based on screen width
  const updateColumnCount = () => {
    const width = window.innerWidth;
    let newColumnCount;
    
    if (width > 2385) {
      newColumnCount = 10;
    } else if (width <= 2385 && width > 2148) {
      newColumnCount = 9;
    } else if (width <= 2148 && width > 1911) {
      newColumnCount = 8;
    } else if (width <= 1911 && width > 1675) {
      newColumnCount = 7;
    } else if (width <= 1675 && width > 1438) {
      newColumnCount = 6;
    } else if (width <= 1438 && width > 1175) {
      newColumnCount = 5;
    } else if (width <= 1175 && width > 800) {
      newColumnCount = 4;
    } else if (width <= 800 && width > 425) {
      newColumnCount = 3;
    } else {
      newColumnCount = 2;
    }
    
    setColumnCount(newColumnCount);
    // Update batch size based on column count (columnCount * 10)
    setBatchSize(newColumnCount * 10);
  };

  // Add resize listener
  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Set up intersection observer for earlier loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // Move any buffered images to main display
          if (bufferImages.length > 0) {
            setImages(prev => [...prev, ...bufferImages]);
            setBufferImages([]);
          }
          // Load more images
          loadMoreImages(allImageRefs, 0);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '500px' // Start loading when within 500px of the observer
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [allImageRefs, loading, bufferImages.length]);

  return (
    <div className="">
      <div className="wallpaper-masonry" style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: '20px',
        width: '100%',
      }}>
        {(() => {
          // Filter images based on selectedFilter
          const filteredImages = selectedFilter === 'all' 
            ? images 
            : images.filter(img => img.type === selectedFilter);

          // Separate desktop and phone images from filtered images
          const desktopImages = filteredImages.filter(img => img.type === 'desktop');
          const phoneImages = filteredImages.filter(img => img.type === 'phone');
          
          // Calculate approx desktop images per column
          const desktopPerColumn = Math.ceil(desktopImages.length / columnCount);
          
          return Array.from({ length: columnCount }, (_, colIndex) => {
            // Calculate which desktop images go in this column
            const startDesktopIdx = colIndex * desktopPerColumn;
            const endDesktopIdx = Math.min((colIndex + 1) * desktopPerColumn, desktopImages.length);
            const columnDesktopImages = desktopImages.slice(startDesktopIdx, endDesktopIdx);
            
            // Get phone images for this column
            const columnPhoneImages = phoneImages.filter((_, i) => i % columnCount === colIndex);
            
            // Merge desktop and phone images with spacing
            const columnImages = [];
            const phoneImagesPerSegment = Math.ceil(columnPhoneImages.length / (columnDesktopImages.length + 1));
            
            // Add initial phone images
            columnImages.push(...columnPhoneImages.slice(0, phoneImagesPerSegment));
            
            // Intersperse desktop images with remaining phone images
            columnDesktopImages.forEach((desktop, idx) => {
              columnImages.push(desktop);
              const startIdx = (idx + 1) * phoneImagesPerSegment;
              const endIdx = startIdx + phoneImagesPerSegment;
              const phoneSegment = columnPhoneImages.slice(startIdx, endIdx);
              columnImages.push(...phoneSegment);
            });
            
            return (
              <div key={colIndex} className="wallpaper-column">
                {columnImages.map((image, index) => (
                  <WallpaperCard
                    key={`${colIndex}-${index}`}
                    imageURL={image.url}
                    type={image.type}
                  />
                ))}
              </div>
            );
          });
        })()}
      </div>
      {loading && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          width: '100%',
          margin: '1rem 0'
        }}>
          <div style={{
            width: 'clamp(50px, 8vw, 80px)',
            height: 'clamp(50px, 8vw, 80px)',
            position: 'relative'
          }}>
            <Image
              src="/loader.gif"
              alt="Loading..."
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div ref={observerTarget}></div>
    </div>
  );
};

export default Wallpaper;