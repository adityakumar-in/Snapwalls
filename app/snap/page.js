'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { db } from '/components/firebase.config';
import WallpaperCard from '/components/WallpaperCard';
import { useRouter } from 'next/navigation';

const SnappedPage = () => {
  const [snappedWallpapers, setSnappedWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/login');
      return;
    }

    const snappedRef = ref(db, `users/${auth.currentUser.uid}/snapped`);
    const unsubscribe = onValue(snappedRef, (snapshot) => {
      if (!snapshot.exists()) {
        setSnappedWallpapers([]);
        setLoading(false);
        return;
      }

      const wallpapers = Object.entries(snapshot.val())
        .map(([key, data]) => ({
          url: data.url,
          timestamp: data.timestamp
        }))
        .sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first

      setSnappedWallpapers(wallpapers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser, router]);

  if (loading) {
    return (
      <div className='default-padding flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='default-padding'>
      <h1 className='text-3xl font-bold mb-8'>Snapped Wallpapers</h1>
      {snappedWallpapers.length === 0 ? (
        <div className='text-center text-gray-500'>
          <p>No snapped wallpapers yet.</p>
          <p>Click the snap button on any wallpaper to add it to your collection!</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {snappedWallpapers.map((wallpaper) => (
            <WallpaperCard 
              key={wallpaper.url} 
              imageURL={wallpaper.url}
              type="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnappedPage;
