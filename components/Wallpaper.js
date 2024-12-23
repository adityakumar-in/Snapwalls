'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '@/app/styles/wallpaper.css';
import WallpaperCard from './WallpaperCard';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const Wallpaper = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allImageRefs, setAllImageRefs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(2);
  const [batchSize, setBatchSize] = useState(20);
  const [bufferImages, setBufferImages] = useState([]); // Buffer for preloaded images
  const observerTarget = useRef(null);

  // Fetch all image references initially
  useEffect(() => {
    const fetchImageRefs = async () => {
      setLoading(true);
      try {
        console.log('Fetching image references...');
        const storageRef = ref(storage, '/'); 
        console.log('Storage ref:', storageRef);
        
        const result = await listAll(storageRef);
        console.log('Found images:', result.items.length);
        
        setAllImageRefs(result.items);
        if (result.items.length > 0) {
          loadMoreImages(result.items, 0);
        } else {
          console.log('No images found in storage');
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

  // Function to load more images
  const loadMoreImages = async (refs, startIndex) => {
    if (loading || startIndex >= refs.length) return;

    setLoading(true);
    try {
      console.log(`Loading images from index ${startIndex}`);
      const endIndex = Math.min(startIndex + batchSize, refs.length);
      const newImagesPromises = refs.slice(startIndex, endIndex).map(async (imageRef) => {
        try {
          console.log('Fetching URL for:', imageRef.name);
          const cachedUrl = sessionStorage.getItem(`wallpaper_${imageRef.name}`);
          let url;
          
          if (cachedUrl) {
            console.log('Using cached URL for:', imageRef.name);
            url = cachedUrl;
          } else {
            url = await getDownloadURL(imageRef);
            sessionStorage.setItem(`wallpaper_${imageRef.name}`, url);
          }
          
          const fileName = imageRef.name.toLowerCase();
          const type = fileName.includes('desktop') || 
                      fileName.includes('landscape') ? 'desktop' : 'phone';
          
          return { url, type };
        } catch (error) {
          console.error('Error fetching URL for', imageRef.name, error);
          return null;
        }
      });

      const newImages = (await Promise.all(newImagesPromises)).filter(Boolean);
      console.log('Loaded new images:', newImages.length);
      
      // Add new images to main display or buffer based on current scroll position
      if (images.length === 0) {
        setImages(newImages);
      } else {
        setBufferImages(prev => [...prev, ...newImages]);
      }
      setCurrentIndex(endIndex);
    } catch (error) {
      console.error('Error loading more images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect to move buffer images to main display when needed
  useEffect(() => {
    if (bufferImages.length > 0) {
      setImages(prev => [...prev, ...bufferImages]);
      setBufferImages([]);
    }
  }, [bufferImages]);

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
          loadMoreImages(allImageRefs, currentIndex);
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
  }, [currentIndex, loading, allImageRefs, bufferImages.length]);

  return (
    <div className="">
      <div className="wallpaper-masonry" style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: '20px',
        width: '100%',
      }}>
        {(() => {
          // Separate desktop and phone images
          const desktopImages = images.filter(img => img.type === 'desktop');
          const phoneImages = images.filter(img => img.type === 'phone');
          
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
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div ref={observerTarget}></div>
    </div>
  );
};

export default Wallpaper;