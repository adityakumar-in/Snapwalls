'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '@/app/styles/wallpaper.css';
import WallpaperCard from './WallpaperCard';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

const IMAGES_PER_PAGE = 40;

const Wallpaper = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allImageRefs, setAllImageRefs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(2);
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
      const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, refs.length);
      const newImagesPromises = refs.slice(startIndex, endIndex).map(async (imageRef) => {
        try {
          console.log('Fetching URL for:', imageRef.name);
          const url = await getDownloadURL(imageRef);
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
      
      setImages(prev => [...prev, ...newImages]);
      setCurrentIndex(endIndex);
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
    if (width > 2385) {
      setColumnCount(9);
    } else if (width <= 2385 && width > 2148) {
      setColumnCount(8);
    } else if (width <= 2148 && width > 1911) {
      setColumnCount(7);
    } else if (width <= 1911 && width > 1675) {
      setColumnCount(6);
    } else if (width <= 1675 && width > 1438) {
      setColumnCount(5);
    } else if (width <= 1438 && width > 765) {
      setColumnCount(4);
    } else if (width <=  765 && width > 700) {
      setColumnCount(3);
    } else {
      setColumnCount(2);
    }
  };

  // Add resize listener
  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreImages(allImageRefs, currentIndex);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [currentIndex, loading, allImageRefs]);

  return (
    <div className="">
      <div className="wallpaper-masonry" style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: '20px',
        width: '100%',
      }}>
        {Array.from({ length: columnCount }, (_, colIndex) => (
          <div key={colIndex} className="wallpaper-column">
            {images
              .filter((_, i) => i % columnCount === colIndex)
              .map((image, index) => (
                <WallpaperCard
                  key={index * columnCount + colIndex}
                  imageURL={image.url}
                  type={image.type || 'phone'}
                />
              ))}
          </div>
        ))}
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