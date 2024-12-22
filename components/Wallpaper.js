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

  if (error) {
    return (
      <div className="wallpaper-container">
        <div className="error-message">
          Error loading images: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="wallpaper-container">
      {images.length === 0 && !loading ? (
        <div className="no-images-message">
          No images found
        </div>
      ) : (
        <div className="wallpaper-grid">
          {images.map((image, index) => (
            <WallpaperCard 
              key={`${image.url}-${index}`}
              imageURL={image.url}
              type={image.type}
            />
          ))}
        </div>
      )}
      
      {/* Loading indicator and observer target */}
      <div ref={observerTarget} className="loading-trigger">
        {loading && <div className="loading-spinner">Loading...</div>}
      </div>
    </div>
  );
};

export default Wallpaper;