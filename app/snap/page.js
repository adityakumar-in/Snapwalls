'use client';

import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref as dbRef, onValue } from 'firebase/database';
import { db } from '/components/firebase.config';
import WallpaperCard from '/components/WallpaperCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Login from '@/components/Login';
import '@/app/styles/wallpaper.css';

const SnappedPage = () => {
  const [snappedWallpapers, setSnappedWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(2);
  const [showLogin, setShowLogin] = useState(false);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setShowLogin(true);
        setLoading(false);
        return;
      }

      const snappedRef = dbRef(db, `users/${user.uid}/snapped`);
      const unsubscribeSnaps = onValue(snappedRef, (snapshot) => {
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

      return () => unsubscribeSnaps();
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        height: '100vh',
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
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="default-padding padding-bottom">
      {showLogin ? (
        <Login onClose={() => setShowLogin(false)} />
      ) : (
        <div className="wallpaper-snapped-page-header-container">
          <h1 className="wallpaper-snapped-page-title">Snapped Wallpapers</h1>
        </div>
      )}
      {showLogin ? null : snappedWallpapers.length === 0 ? (
        <div className='empty-snap-container'>
          <div className='empty-snap-icon'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
          <h2 className='empty-snap-title'>Your Collection is Empty</h2>
          <p className='empty-snap-text'>
            Start building your perfect wallpaper collection! Browse through our gallery and snap your favorite wallpapers.
          </p>
          <button onClick={() => router.push('/')} className='browse-snap-button'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Discover Wallpapers
          </button>
        </div>
      ) : (
        <div className="wallpaper-masonry" style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          gap: '20px',
          width: '100%',
          paddingBottom: '3.5rem'
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
