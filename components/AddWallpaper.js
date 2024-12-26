import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage, auth } from '/components/firebase.config';
import '../app/styles/addWallpaper.css';

const AddWallpaper = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [series, setSeries] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [type, setType] = useState('Desktop');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(20);
  const [isExpanded, setIsExpanded] = useState(false);
  const dialogRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(null);
  const currentYRef = useRef(null);
  const initialHeightRef = useRef(null);

  const handleDrawerClick = (e) => {
    // Only handle click events, not touch events
    if (e.type === 'touchstart' || e.type === 'touchend') return;
    
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentHeight(20);
      setIsExpanded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    const windowHeight = window.innerHeight;
    
    // Calculate new position as percentage of window height
    let newHeight = Math.max(20, Math.min(85, initialHeightRef.current - (deltaY / windowHeight * 100)));
    
    if (dialogRef.current) {
      // Apply transform immediately for smooth tracking
      dialogRef.current.style.height = `${newHeight}vh`;
      dialogRef.current.style.transform = `translateZ(0)`; // Force GPU acceleration
      
      // Update expanded state based on height
      setIsExpanded(newHeight > 65);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || !dialogRef.current) return;

    const currentHeight = parseFloat(dialogRef.current.style.height);
    const velocity = Math.abs(startYRef.current - currentYRef.current) / 100;
    const isQuickSwipe = velocity > 0.5;
    const isUpwardSwipe = startYRef.current > currentYRef.current;

    // Snap points
    const snapPoints = {
      close: 20,    // Closed state
      mid: 45,      // Mid state
      full: 85      // Fully expanded
    };

    let targetHeight;
    
    if (isQuickSwipe) {
      // Quick swipe behavior
      targetHeight = isUpwardSwipe ? snapPoints.full : snapPoints.close;
    } else {
      // Normal drag behavior
      if (currentHeight < 30) {
        targetHeight = snapPoints.close;
      } else if (currentHeight > 65) {
        targetHeight = snapPoints.full;
      } else {
        targetHeight = snapPoints.mid;
      }
    }

    // Apply smooth transition
    dialogRef.current.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    dialogRef.current.style.height = `${targetHeight}vh`;
    
    // Update state and cleanup
    setIsExpanded(targetHeight > 65);
    setCurrentHeight(targetHeight);

    if (targetHeight === snapPoints.close) {
      setTimeout(onClose, 300);
    }

    // Reset refs
    isDraggingRef.current = false;
    startYRef.current = null;
    currentYRef.current = null;
    initialHeightRef.current = null;

    // Remove dragging class
    dialogRef.current.classList.remove('dragging');
  };

  const handleTouchStart = (e) => {
    if (!e.touches || !e.target.closest('.dialog-header, .drawer-handle')) return;

    const touch = e.touches[0];
    isDraggingRef.current = true;
    startYRef.current = touch.clientY;
    currentYRef.current = touch.clientY;
    initialHeightRef.current = currentHeight;

    if (dialogRef.current) {
      dialogRef.current.style.transition = 'none';
      dialogRef.current.classList.add('dragging');
    }
  };

  // Update useEffect for touch events
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('touchstart', handleTouchStart, { passive: true });
    dialog.addEventListener('touchmove', handleTouchMove, { passive: false });
    dialog.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      dialog.removeEventListener('touchstart', handleTouchStart);
      dialog.removeEventListener('touchmove', handleTouchMove);
      dialog.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentHeight, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('add-wallpaper-overlay')) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      // Clean up the object URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  useEffect(() => {
    // Cleanup preview URL when component unmounts or when preview changes
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !category) return;

    try {
      setUploading(true);
      
      // Format function to handle spaces and convert to lowercase
      const formatInput = (str) => {
        if (!str) return '';
        return str
          .toLowerCase()
          .replace(/\s+/g, '-'); // Replace spaces with hyphens
      };
      
      // Format all inputs
      const formattedCategory = formatInput(category);
      const formattedSeries = formatInput(series);
      const formattedCharacter = formatInput(characterName);
      const formattedType = type.toLowerCase();
      
      // Get file extension
      const extension = file.name.split('.').pop().toLowerCase();

      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('Please sign in to upload wallpapers');
      }

      // Create base filename without number
      const baseFilename = [
        formattedCategory,
        formattedSeries,
        formattedCharacter
      ].filter(Boolean).join('_');

      // List all files in the storage to check for existing files
      const storageRef = ref(storage, '/');
      const filesList = await listAll(storageRef);
      
      // Find existing files with similar names and get the highest number
      let highestNum = 0;
      const regex = new RegExp(`^${baseFilename}-\\d+_${formattedType}\\.${extension}$`);
      
      filesList.items.forEach(item => {
        const match = item.name.match(regex);
        if (match) {
          const num = parseInt(item.name.split('_')[item.name.split('_').length - 2].split('-')[1]);
          highestNum = Math.max(highestNum, num);
        }
      });

      // Create final filename with next number
      const finalFilename = `${baseFilename}-${highestNum + 1}_${formattedType}.${extension}`;
      
      console.log('Generated filename:', finalFilename);
      console.log('File type:', extension);

      // Upload file directly to Firebase Storage root
      const fileRef = ref(storage, finalFilename);
      await uploadBytes(fileRef, file);
      console.log('File uploaded successfully to Firebase Storage:', finalFilename);

      // Show success message
      setShowSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFile(null);
        setCategory('');
        setSeries('');
        setCharacterName('');
        setPreview(null);
        setShowSuccess(false);
        setUploading(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error during upload:', error);
      if (error.code === 'storage/unauthorized') {
        alert('Error: You do not have permission to upload wallpapers. Please sign in with an authorized account.');
      } else {
        alert('Failed to upload wallpaper. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  const dialogStyle = isMobile ? {
    height: `${currentHeight}vh`,
    transition: isDraggingRef.current ? 'none' : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  } : {};

  return (
    <div className="add-wallpaper-overlay" onClick={handleOverlayClick}>
      <div 
        ref={dialogRef}
        className={`add-wallpaper-dialog ${isExpanded ? 'expanded' : ''}`}
        onClick={e => e.stopPropagation()}
        style={dialogStyle}
      >
        <div className="dialog-header">
          {isMobile && (
            <div 
              className="drawer-handle" 
              onClick={handleDrawerClick}
              onTouchStart={(e) => e.stopPropagation()} // Prevent touch events from triggering click
            />
          )}
          <h2 className="add-wallpaper-title">Add New Wallpaper</h2>
          {!isMobile && (
            <button className="close-button" onClick={onClose}>×</button>
          )}
        </div>

        <div className="dialog-content">
          <form onSubmit={handleUpload} className="add-wallpaper-form">
            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Anime, Nature, Abstract"
                required
              />
            </div>

            <div className="form-group">
              <label>Series</label>
              <input
                type="text"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                placeholder="e.g., Naruto, One Piece"
                required
              />
            </div>

            <div className="form-group">
              <label>Character Name (Optional)</label>
              <input
                type="text"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                placeholder="e.g., Luffy, Naruto"
              />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <div className="type-selector-container">
                <div className="type-option">
                  <input
                    type="radio"
                    id="desktop-type"
                    name="wallpaper-type"
                    value="Desktop"
                    checked={type === 'Desktop'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label htmlFor="desktop-type">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 20h8" strokeLinecap="round"/>
                      <path d="M12 16v4" strokeLinecap="round"/>
                    </svg>
                    Desktop
                  </label>
                </div>
                <div className="type-option">
                  <input
                    type="radio"
                    id="mobile-type"
                    name="wallpaper-type"
                    value="Mobile"
                    checked={type === 'Mobile'}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <label htmlFor="mobile-type">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                      <rect x="6" y="3" width="12" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 18h4" strokeLinecap="round"/>
                    </svg>
                    Mobile
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Wallpaper File *</label>
              <div className="file-input-container">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                  id="wallpaper-file"
                />
                <label htmlFor="wallpaper-file" className="file-input-label">
                  Choose File
                </label>
                {file && <span className="file-name">{file.name}</span>}
              </div>
            </div>

            {preview && (
              <div className="preview-container">
                <img 
                  src={preview} 
                  alt="Wallpaper preview" 
                  className="wallpaper-preview"
                  onError={() => {
                    console.error('Failed to load preview');
                    setPreview(null);
                  }}
                />
              </div>
            )}

            <button type="submit" className="upload-button" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Wallpaper'}
            </button>
          </form>

          {showSuccess && (
            <div className="success-message">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Wallpaper uploaded successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddWallpaper;