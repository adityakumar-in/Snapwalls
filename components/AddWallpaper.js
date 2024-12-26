import React, { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from '/components/firebase.config';
import { ref as dbRef, set } from 'firebase/database';
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
  const [touchStartY, setTouchStartY] = useState(null);
  const [currentHeight, setCurrentHeight] = useState(20); // Initial height in vh
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);
  const dialogRef = useRef(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStartY) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    const windowHeight = window.innerHeight;
    
    // Convert the delta to vh units
    const deltaVh = (deltaY / windowHeight) * 100;
    
    // Calculate new height keeping it between 0vh and 85vh
    let newHeight = currentHeight + deltaVh;
    newHeight = Math.max(0, Math.min(85, newHeight));
    
    setCurrentHeight(newHeight);
    setTouchStartY(touchY);
  };

  const handleTouchEnd = () => {
    setTouchStartY(null);
    
    // Close if dragged down below 30vh
    if (currentHeight < 30) {
      onClose();
      // Reset height for next time
      setTimeout(() => setCurrentHeight(50), 300);
    } else if (currentHeight > 65) {
      // Expand if dragged up past threshold
      setCurrentHeight(85);
      setIsExpanded(true);
    } else {
      // Collapse to initial position
      setCurrentHeight(45);
      setIsExpanded(false);
    }
  };

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

    // Check if user is authenticated
    if (!auth.currentUser) {
      alert('Please sign in to upload wallpapers');
      return;
    }

    try {
      setUploading(true);
      
      // Format names: remove special characters and convert to kebab-case
      const formatName = (str) => {
        if (!str) return '';
        return str
          .toLowerCase()
          // Replace special characters and spaces with hyphens
          .replace(/[^a-z0-9]+/g, '-')
          // Remove leading and trailing hyphens
          .replace(/^-+|-+$/g, '');
      };
      
      const formattedCategory = formatName(category);
      const formattedSeries = formatName(series);
      const formattedCharacter = formatName(characterName);
      
      // Validate the formatted category
      if (!formattedCategory) {
        throw new Error('Invalid category name. Please use only letters, numbers, and simple punctuation.');
      }
      
      // Format: category_series_character_type_timestamp.extension
      const timestamp = Date.now();
      const extension = file.name.split('.').pop().toLowerCase();
      
      // Convert type to the exact format expected by explore page
      const formattedType = type.toLowerCase() === 'desktop' ? 'desktop' : 'mobile';
      
      // Build filename parts, filtering out empty strings
      const filenameParts = [
        formattedCategory,
        formattedSeries,
        formattedCharacter,
        formattedType,
        timestamp.toString()
      ].filter(Boolean);
      
      // Join with underscores and add extension
      const filename = `${filenameParts.join('_')}.${extension}`;
      
      // Include user ID in the storage path for better organization and security
      const storageRef = ref(storage, `users/${auth.currentUser.uid}/wallpapers/${filename}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log('File uploaded successfully:', snapshot);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL obtained:', downloadURL);
        
        // Save metadata to Realtime Database under the user's ID
        const wallpaperRef = dbRef(db, `users/${auth.currentUser.uid}/uploads/${filename.replace('.' + extension, '')}`);
        await set(wallpaperRef, {
          url: downloadURL,
          category: formattedCategory,
          series: formattedSeries || null,
          characterName: formattedCharacter || null,
          type: formattedType,
          timestamp,
          originalName: filename,
          displayName: `${category}${series ? ' - ' + series : ''}${characterName ? ' - ' + characterName : ''}`,
          uploadedBy: auth.currentUser.uid
        });
        console.log('Metadata saved successfully');

        // Also save to the public wallpapers collection
        const publicWallpaperRef = dbRef(db, `wallpapers/${filename.replace('.' + extension, '')}`);
        await set(publicWallpaperRef, {
          url: downloadURL,
          category: formattedCategory,
          series: formattedSeries || null,
          characterName: formattedCharacter || null,
          type: formattedType,
          timestamp,
          originalName: filename,
          displayName: `${category}${series ? ' - ' + series : ''}${characterName ? ' - ' + characterName : ''}`,
          uploadedBy: auth.currentUser.uid
        });

        // Show success message
        setShowSuccess(true);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFile(null);
          setCategory('');
          setSeries('');
          setCharacterName('');
          setType('Desktop');
          setPreview(null);
          setShowSuccess(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Detailed upload error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        if (error.message.includes('Invalid category')) {
          alert(error.message);
        } else if (error.code === 'storage/unauthorized') {
          alert('Error: You do not have permission to upload wallpapers. Please sign in with an authorized account.');
        } else if (error.code === 'storage/canceled') {
          alert('Error: Upload was canceled. Please try again.');
        } else if (error.code === 'storage/unknown') {
          alert('Error: An unknown error occurred. Please try again.');
        } else {
          alert('Failed to upload wallpaper. Please try again.');
        }
      } finally {
        setUploading(false);
      }
    } catch (outerError) {
      console.error('Outer error:', outerError);
      alert('Failed to prepare wallpaper for upload. Please try again.');
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  const dialogStyle = isMobile ? {
    height: `${currentHeight}vh`,
    transition: touchStartY ? 'none' : 'height 0.3s ease'
  } : {};

  return (
    <div className="add-wallpaper-overlay" onClick={handleOverlayClick}>
      <div 
        ref={dialogRef}
        className={`add-wallpaper-dialog ${isExpanded ? 'expanded' : ''}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={dialogStyle}
      >
        {!isMobile && (
          <button className="close-button" onClick={onClose}>×</button>
        )}
        {isMobile && (
          <div className="drawer-handle" />
        )}
        <h2 className="add-wallpaper-title">Add New Wallpaper</h2>
        
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
            <label>Series (Optional)</label>
            <input
              type="text"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              placeholder="e.g., Naruto, One Piece"
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
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
            </select>
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
  );
};

export default AddWallpaper; 