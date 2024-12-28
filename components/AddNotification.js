'use client'
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ref, push, serverTimestamp, get, child } from 'firebase/database';
import { db } from '/components/firebase.config';
import '/app/styles/addNotification.css';

const NOTIFICATION_TYPES = [
  {
    value: 'comment',
    label: 'Comment',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    value: 'like',
    label: 'Like',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
      </svg>
    )
  },
  {
    value: 'follow',
    label: 'Follow',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
      </svg>
    )
  },
  {
    value: 'update',
    label: 'Update',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    value: 'feature',
    label: 'Feature',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                      <g>
                        <path d="M13.175,203.061c0,0-0.004-0.013-0.007-0.026l-0.672-1.763L13.175,203.061z"></path>
                        <path d="M17.239,163.415l11.178-7.3c0.006,0,0.012-0.007,0.019-0.014L17.239,163.415z"></path>
                        <path d="M480.364,260.466c-0.549-1.436-0.823-2.951-0.823-4.466c0-1.521,0.274-3.042,0.826-4.492l16.869-44.275 l1.586-4.172c1.74-4.564,2.582-9.324,2.582-14.006c0.006-12.986-6.458-25.516-17.835-32.953l-5.599-3.656l-37.84-24.708 c-2.569-1.684-4.447-4.276-5.25-7.247l-13.548-50.047c-4.675-17.23-20.28-29.075-37.978-29.075c-0.669,0-1.335,0.013-2.004,0.052 L329.766,44v-0.006l-0.774,0.02c-2.896,0-5.687-0.98-7.933-2.788l-37.766-30.42l-2.598-2.089 C273.507,2.912,264.725-0.006,256.002,0c-8.72-0.013-17.504,2.912-24.697,8.717l0.01-0.007L195.11,37.87l-4.159,3.35 c-2.256,1.815-5.057,2.795-7.94,2.795L182.338,44l-51.555-2.572l-0.033-0.007c-0.8-0.046-1.502-0.052-2.102-0.052 c-17.701,0-33.303,11.844-37.978,29.081l-13.549,50.041c-0.806,2.983-2.693,5.582-5.278,7.273l-3.732,2.436l-39.694,25.915 c-11.371,7.444-17.828,19.966-17.822,32.946c0,4.675,0.839,9.415,2.573,14.012L480.364,260.466z M455.38,241.988 c-1.72,4.512-2.582,9.265-2.582,14.012c0,4.754,0.862,9.507,2.582,14.019l18.449,48.44l0.003,0.007 c0.565,1.482,0.829,2.984,0.829,4.473c-0.007,4.166-2.063,8.188-5.716,10.571l-43.41,28.344h0.003 c-8.086,5.275-13.95,13.346-16.474,22.67l-13.548,50.04c-1.485,5.524-6.513,9.324-12.16,9.317l-0.751-0.02l-0.189-0.006 l-51.474-2.566h0.036c-0.634-0.039-1.303-0.052-2.004-0.059c-8.968,0-17.685,3.069-24.694,8.717l-3.47,2.801l-36.897,29.721 c-2.324,1.874-5.086,2.788-7.91,2.788c-2.82,0-5.586-0.914-7.913-2.788l-40.368-32.522c-7.006-5.641-15.719-8.71-24.69-8.71 c-0.601,0-1.303,0.007-2.106,0.052v0.007l-51.64,2.579l0.016-0.006l-0.652,0.013c-5.642,0.006-10.676-3.794-12.161-9.317 l-13.548-50.04c-2.524-9.324-8.387-17.394-16.474-22.67l-32.212-21.031l-11.194-7.313c-3.65-2.377-5.713-6.405-5.72-10.578 c0.003-1.496,0.265-2.997,0.826-4.466l18.461-48.454l-0.003,0.007c1.72-4.518,2.582-9.265,2.582-14.019 c0-4.753-0.858-9.506-2.582-14.018L38.848,195.33l-0.679-1.776c-0.565-1.489-0.826-2.997-0.83-4.492 c0.007-4.172,2.067-8.188,5.716-10.564l43.414-28.343l0.007-0.007c8.082-5.288,13.94-13.352,16.464-22.67l13.548-50.047 c1.482-5.517,6.523-9.324,12.161-9.317l0.503,0.006l51.91,2.592l0.056,0.007c0.63,0.026,1.264,0.04,1.894,0.046 c8.968,0,17.688-3.063,24.701-8.704l40.386-32.529c2.321-1.874,5.08-2.782,7.904-2.788c2.821,0,5.583,0.914,7.907,2.788 l-2.602-2.096l42.979,34.618c7.022,5.654,15.752,8.704,24.707,8.704c0.666,0,1.263-0.02,1.792-0.033h-0.14l52.075-2.599h0.035 l0.601-0.013c5.641-0.007,10.678,3.8,12.16,9.317l13.548,50.047c2.524,9.317,8.38,17.381,16.464,22.67l49.018,32.006l-5.602-3.656 c3.653,2.377,5.71,6.392,5.716,10.558c0,1.496-0.264,2.998-0.832,4.492l-20.832,54.683L455.38,241.988z"></path>
                        <path d="M196.151,226.298l-13.784,2.709c-0.725,0.15-1.123,0.725-0.979,1.463l10.254,52.175l-0.597,0.124 l-39.528-46.423c-0.653-0.757-1.45-0.986-2.305-0.816l-14.636,2.88c-0.725,0.144-1.123,0.718-0.966,1.455l15.817,80.448 c0.14,0.738,0.725,1.136,1.45,0.992l13.783-2.71c0.725-0.15,1.123-0.731,0.983-1.469l-10.242-52.051l0.61-0.118l39.613,46.28 c0.653,0.757,1.338,0.999,2.318,0.816l14.509-2.86c0.724-0.144,1.122-0.725,0.966-1.463l-15.814-80.454 C197.46,226.54,196.876,226.155,196.151,226.298z"></path>
                        <path d="M280.868,279.649l-35.731,7.026c-0.483,0.105-0.78-0.091-0.865-0.581l-3.385-17.192 c-0.102-0.483,0.098-0.77,0.581-0.874l29.757-5.85c0.725-0.144,1.123-0.719,0.983-1.449l-2.546-12.922 c-0.144-0.724-0.728-1.123-1.453-0.986l-29.754,5.857c-0.484,0.091-0.784-0.111-0.881-0.594l-3.232-16.454 c-0.098-0.49,0.101-0.784,0.584-0.875l35.731-7.026c0.725-0.144,1.123-0.725,0.966-1.456l-2.56-13.038 c-0.144-0.738-0.725-1.13-1.453-0.986l-53.152,10.454c-0.741,0.144-1.126,0.725-0.982,1.462l15.817,80.454 c0.156,0.732,0.724,1.123,1.465,0.98l53.152-10.454c0.728-0.144,1.126-0.725,0.97-1.456l-2.563-13.046 C282.178,279.91,281.593,279.506,280.868,279.649z"></path>
                        <path d="M377.221,190.694l-15.605,3.068c-0.852,0.164-1.266,0.634-1.224,1.515l-1.221,54.291l-0.258,0.046 l-24.847-49.16c-0.398-0.699-0.983-1.084-1.708-0.94l-10.61,2.083c-0.839,0.17-1.237,0.744-1.338,1.541l-3.911,54.82l-0.242,0.052 l-22.19-49.701c-0.255-0.718-0.839-1.096-1.691-0.927l-15.732,3.082c-0.852,0.17-0.996,0.706-0.725,1.417l37.266,76.23 c0.398,0.685,0.98,1.084,1.708,0.94l12.19-2.403c0.852-0.163,1.25-0.751,1.348-1.528l4.368-54.415l0.242-0.045l24.521,48.728 c0.385,0.685,0.97,1.084,1.822,0.914l12.19-2.403c0.852-0.157,1.365-0.77,1.352-1.535l5.504-84.645 C378.4,190.955,378.073,190.524,377.221,190.694z"></path>
                      </g>
                    </svg>
    )
  }
];

const AddNotification = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('comment');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setType('comment');
      setShowSuccess(false);
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get all users
      const usersRef = ref(db, 'users');
      const usersSnapshot = await get(usersRef);
      
      if (usersSnapshot.exists()) {
        const users = Object.keys(usersSnapshot.val());
        
        // Add notification to each user's notification folder
        const promises = users.map(uid => {
          const userNotificationRef = ref(db, `notification/${uid}`);
          return push(userNotificationRef, {
            message,
            type,
            timestamp: Date.now()
          });
        });
        
        await Promise.all(promises);
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error adding notification:', error);
      setIsLoading(false);
    }
  };

  const selectedType = NOTIFICATION_TYPES.find(t => t.value === type);

  useEffect(() => {
    if (buttonRef.current && isDropdownOpen) {
      const updatePosition = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(buttonRef.current);
        const width = rect.width;
        
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: width
        });
      };
      
      updatePosition();
      const timeoutId = setTimeout(updatePosition, 50);
      
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        clearTimeout(timeoutId);
      };
    }
  }, [isDropdownOpen]);

  const renderDropdown = () => {
    if (!isDropdownOpen) return null;

    const isMobile = window.innerWidth <= 500;
    const dropdownStyles = isMobile ? {} : {
      position: 'fixed',
      top: `${dropdownPosition?.top}px`,
      left: `${dropdownPosition?.left}px`,
      width: `${dropdownPosition?.width}px`,
      visibility: dropdownPosition ? 'visible' : 'hidden'
    };

    return createPortal(
      <div 
        ref={dropdownRef}
        className={`notification-select-options ${isDropdownOpen ? 'open' : ''}`}
        style={dropdownStyles}
      >
        {NOTIFICATION_TYPES.map((option) => (
          <div
            key={option.value}
            className={`notification-select-option ${type === option.value ? 'selected' : ''}`}
            onClick={() => {
              setType(option.value);
              setIsDropdownOpen(false);
            }}
          >
            {option.icon}
            {option.label}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!startY) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    
    if (diff > 0) { // Only allow downward swipe
      setCurrentY(diff);
      if (modalRef.current) {
        modalRef.current.style.transform = `translateY(${diff}px)`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (!startY || !currentY) return;
    
    if (currentY > 100) { // If dragged down more than 100px, close
      if (modalRef.current) {
        modalRef.current.classList.add('closing');
      }
      setTimeout(onClose, 300);
    } else {
      if (modalRef.current) {
        modalRef.current.style.transform = '';
      }
    }
    
    setStartY(null);
    setCurrentY(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`notification-modal-overlay`} 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (modalRef.current) {
            modalRef.current.classList.add('closing');
            e.currentTarget.classList.add('closing');
            setTimeout(onClose, 300);
          } else {
            onClose();
          }
        }
      }}
    >
      <div 
        ref={modalRef}
        className="notification-modal"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="notification-drawer-handle" />
        <button 
          className="notification-close-button"
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        {showSuccess ? (
          <div className="navbar-notification-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="success-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>Notification added successfully!</p>
          </div>
        ) : (
          <>
            <h2 className="notification-modal-title">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
              Add Global Notification
            </h2>
            <form onSubmit={handleSubmit} className="notification-form">
              <div className="notification-form-group">
                <label className="notification-label">
                  Message
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="notification-input"
                    placeholder="Enter your notification message"
                    required
                    disabled={isLoading}
                  />
                </label>
              </div>
              <div className="notification-form-group">
                <label className="notification-label">
                  Type
                  <button
                    type="button"
                    ref={buttonRef}
                    className={`notification-select-button ${isDropdownOpen ? 'open' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isLoading}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="option-icon">
                        {selectedType.icon}
                      </div>
                      {selectedType.label}
                    </div>
                    <svg className="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                    </svg>
                  </button>
                </label>
              </div>
              {renderDropdown()}
              <div className="notification-buttons">
                <button
                  type="button"
                  onClick={onClose}
                  className="notification-button notification-button-cancel"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="notification-button notification-button-submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-state">
                      <span className="loading-text">Adding</span>
                      <div className="spinner"></div>
                    </div>
                  ) : (
                    'Add Notification'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddNotification;
