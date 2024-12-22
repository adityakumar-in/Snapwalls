import { useState, useEffect } from 'react';
import { storage } from '/components/firebase.config';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export const useFirebaseStorage = (batchSize = 40) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastLoadedIndex, setLastLoadedIndex] = useState(0);
  const [allItems, setAllItems] = useState([]);

  // Initially load all references
  useEffect(() => {
    const loadAllRefs = async () => {
      try {
        const imagesRef = ref(storage, 'wallpapers'); // Adjust the path as needed
        const result = await listAll(imagesRef);
        setAllItems(result.items);
      } catch (err) {
        setError(err.message);
        console.error('Error loading references:', err);
      }
    };

    loadAllRefs();
  }, []);

  const loadMoreWallpapers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const endIndex = Math.min(lastLoadedIndex + batchSize, allItems.length);
      const batch = allItems.slice(lastLoadedIndex, endIndex);
      
      const newWallpapers = await Promise.all(
        batch.map(async (item) => {
          const url = await getDownloadURL(item);
          return {
            id: item.name,
            url: url,
            name: item.name
          };
        })
      );

      setWallpapers(prev => [...prev, ...newWallpapers]);
      setLastLoadedIndex(endIndex);
      setHasMore(endIndex < allItems.length);
    } catch (err) {
      setError(err.message);
      console.error('Error loading wallpapers:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    wallpapers,
    loading,
    error,
    hasMore,
    loadMoreWallpapers
  };
};
