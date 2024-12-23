'use client';

import { useEffect, useState, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { ref as dbRef, onValue } from 'firebase/database';
import { db } from '/components/firebase.config';
import WallpaperCard from '/components/WallpaperCard';
import { useRouter } from 'next/navigation';
import '@/app/styles/wallpaper.css';

const SnappedPage = () => {
  const [snappedWallpapers, setSnappedWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(2);
  const auth = getAuth();
  const router = useRouter();

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
  };

  // Add resize listener
  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/login');
      return;
    }

    const snappedRef = dbRef(db, `users/${auth.currentUser.uid}/snapped`);
    const unsubscribe = onValue(snappedRef, (snapshot) => {
      if (!snapshot.exists()) {
        setSnappedWallpapers([]);
        setLoading(false);
        return;
      }

      const wallpapers = Object.entries(snapshot.val())
        .map(([key, data]) => ({
          url: data.url,
          type: data.url.toLowerCase().includes('desktop') || 
                data.url.toLowerCase().includes('landscape') ? 'desktop' : 'phone',
          timestamp: data.timestamp
        }))
        .sort((a, b) => b.timestamp - a.timestamp);

      setSnappedWallpapers(wallpapers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser, router]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="default-padding">
      <h1 className='text-3xl font-bold mb-8'>Snapped Wallpapers</h1>
      {snappedWallpapers.length === 0 ? (
        <div className='text-center text-gray-500'>
          <p>No snapped wallpapers yet.</p>
          <p>Click the snap button on any wallpaper to add it to your collection!</p>
        </div>
      ) : (
        <div className="wallpaper-masonry" style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: '20px',
          width: '100%',
        }}>
          {(() => {
            // Separate desktop and phone images
            const desktopImages = snappedWallpapers.filter(img => img.type === 'desktop');
            const phoneImages = snappedWallpapers.filter(img => img.type === 'phone');
            
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
      )}
    </div>
  );
};

export default SnappedPage;
