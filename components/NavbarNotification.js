'use client'

import React, { useRef, useEffect, useState } from 'react'
import '/app/styles/navbarNotification.css'
import { ref, onValue, update, remove } from 'firebase/database'
import { db } from '/components/firebase.config'
import { useAuth } from '/context/AuthContext'

const NavbarNotification = ({ isActive, onClose }) => {
  const notificationRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  // Pass unread count to parent only if user is logged in
  useEffect(() => {
    if (!user) {
      // Reset notifications when logged out
      setNotifications([]);
      // Dispatch event with 0 count when logged out
      const event = new CustomEvent('unreadNotificationsCount', { detail: 0 });
      window.dispatchEvent(event);
      return;
    }

    // Update to just pass total notification count since we no longer track isRead
    const event = new CustomEvent('unreadNotificationsCount', { detail: notifications.length });
    window.dispatchEvent(event);
  }, [notifications, user]);

  // Calculate time difference
  const getTimeAgo = (timestamp) => {
    const now = new Date().getTime();
    const then = timestamp;
    const difference = now - then;

    // Handle future dates or invalid timestamps
    if (difference < 0 || !timestamp) {
      return 'Just now';
    }

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (weeks === 1) return '1 week ago';
    if (weeks < 4) return `${weeks} weeks ago`;
    if (months === 1) return '1 month ago';
    if (months < 12) return `${months} months ago`;
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: new Date(timestamp).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  // Fetch notifications from Firebase
  useEffect(() => {
    if (!user) return;

    // Fetch user notifications from the new path
    const userNotificationsRef = ref(db, `notification/${user.uid}`);
    const unsubscribe = onValue(userNotificationsRef, (snapshot) => {
      const notifs = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const notification = childSnapshot.val();
          notifs.push({
            id: childSnapshot.key,
            ...notification,
            time: getTimeAgo(notification.timestamp)
          });
        });
      }
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [user]);

  // Delete single notification
  const markAsRead = async (notificationId) => {
    if (!user) return;
    
    try {
      // Delete the notification
      await remove(ref(db, `notification/${user.uid}/${notificationId}`));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // Delete all notifications
  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;

    try {
      const batch = [];

      // Delete all notifications
      notifications.forEach(notif => {
        const notifRef = ref(db, `notification/${user.uid}/${notif.id}`);
        batch.push(remove(notifRef));
      });

      // Execute all deletions in parallel
      await Promise.all(batch);

      // Update local state to remove all notifications
      setNotifications([]);

    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  // Reset styles when notification state changes
  useEffect(() => {
    const panel = notificationRef.current;
    if (!panel) return;

    if (isActive) {
      // Reset styles when opening
      panel.style.transform = '';
      panel.style.opacity = '';
      panel.style.transition = '';
    }
  }, [isActive]);

  // Handle click when not logged in
  const handleContainerClick = (e) => {
    if (!user) {
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
  };

  useEffect(() => {
    const panel = notificationRef.current;
    if (!panel) return;

    let isDragging = false;

    const handleTouchStart = (e) => {
      const header = panel.querySelector('.navbar-notification-header');
      const touchY = e.touches[0].clientY;
      const headerRect = header.getBoundingClientRect();
      const notificationList = panel.querySelector('.navbar-notification-list');
      
      // Only allow dragging if:
      // 1. Touch is within the handle area (top 28px of header)
      // 2. The notification list is scrolled to the top
      if (touchY >= headerRect.top && touchY <= headerRect.top + 28 && 
          (!notificationList || notificationList.scrollTop === 0)) {
        const touch = e.touches[0];
        startY.current = touch.clientY;
        currentY.current = touch.clientY;
        isDragging = true;
        panel.style.transition = 'none';
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const deltaY = touch.clientY - startY.current;
      currentY.current = touch.clientY;

      // Only allow dragging down
      if (deltaY < 0) return;

      // Calculate opacity based on drag distance
      const opacity = 1 - (deltaY / panel.offsetHeight);
      panel.style.transform = `translateY(${deltaY}px)`;
      panel.style.opacity = opacity;
      e.stopPropagation();
      e.preventDefault(); // Prevent scrolling while dragging
    };

    const handleTouchEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.3, 1)';

      const deltaY = currentY.current - startY.current;
      if (deltaY > 150) {
        // If dragged down more than 150px, close the notification
        panel.style.transform = `translateY(100%)`;
        panel.style.opacity = '0';
        setTimeout(() => {
          onClose();
          // Reset styles after closing
          panel.style.transform = '';
          panel.style.opacity = '';
          panel.style.transition = '';
        }, 300);
      } else {
        // Otherwise, snap back to original position
        panel.style.transform = 'translateY(0)';
        panel.style.opacity = '1';
        setTimeout(() => {
          // Reset transition after snapping back
          panel.style.transition = '';
        }, 300);
      }
      e.stopPropagation();
    };

    if (isActive) {
      panel.addEventListener('touchstart', handleTouchStart);
      panel.addEventListener('touchmove', handleTouchMove);
      panel.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (panel) {
        panel.removeEventListener('touchstart', handleTouchStart);
        panel.removeEventListener('touchmove', handleTouchMove);
        panel.removeEventListener('touchend', handleTouchEnd);
        // Reset styles on cleanup
        panel.style.transform = '';
        panel.style.opacity = '';
        panel.style.transition = '';
      }
    };
  }, [isActive, onClose]);

  return (
    <>
      <div 
        className={`notification-overlay ${isActive ? 'active' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }} 
      />
      <div 
        className={`navbar-notification-container ${isActive ? 'active' : ''}`}
        ref={notificationRef}
        onClick={handleContainerClick}
      >
        <div className="navbar-notification-header">
          <div className="navbar-notification-header-content">
            <h3>Notifications</h3>
            {notifications.length > 0 && (
              <button 
                className="mark-all-read"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          <button className="notification-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="navbar-notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className="notification-item"
              >
                <div className="navbar-notification-icon">
                  {notification.type === 'like' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {notification.type === 'comment' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 8H17M7 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {notification.type === 'follow' && (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.44 18L17.43 18.99L19.56 17.02" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {notification.type === 'update' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                    </svg>
                  )}
                  {notification.type === 'feature' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                      <g>
                        <path d="M13.175,203.061c0,0-0.004-0.013-0.007-0.026l-0.672-1.763L13.175,203.061z"></path>
                        <path d="M17.239,163.415l11.178-7.3c0.006,0,0.012-0.007,0.019-0.014L17.239,163.415z"></path>
                        <path d="M480.364,260.466c-0.549-1.436-0.823-2.951-0.823-4.466c0-1.521,0.274-3.042,0.826-4.492l16.869-44.275 l1.586-4.172c1.74-4.564,2.582-9.324,2.582-14.006c0.006-12.986-6.458-25.516-17.835-32.953l-5.599-3.656l-37.84-24.708 c-2.569-1.684-4.447-4.276-5.25-7.247l-13.548-50.047c-4.675-17.23-20.28-29.075-37.978-29.075c-0.669,0-1.335,0.013-2.004,0.052 L329.766,44v-0.006l-0.774,0.02c-2.896,0-5.687-0.98-7.933-2.788l-37.766-30.42l-2.598-2.089 C273.507,2.912,264.725-0.006,256.002,0c-8.72-0.013-17.504,2.912-24.697,8.717l0.01-0.007L195.11,37.87l-4.159,3.35 c-2.256,1.815-5.057,2.795-7.94,2.795L182.338,44l-51.555-2.572l-0.033-0.007c-0.8-0.046-1.502-0.052-2.102-0.052 c-17.701,0-33.303,11.844-37.978,29.081l-13.549,50.041c-0.806,2.983-2.693,5.582-5.278,7.273l-3.732,2.436l-39.694,25.915 c-11.371,7.444-17.828,19.966-17.822,32.946c0,4.675,0.839,9.415,2.573,14.012L480.364,260.466z M455.38,241.988 c-1.72,4.512-2.582,9.265-2.582,14.012c0,4.754,0.862,9.507,2.582,14.019l18.449,48.44l0.003,0.007 c0.565,1.482,0.829,2.984,0.829,4.473c-0.007,4.166-2.063,8.188-5.716,10.571l-43.41,28.344h0.003 c-8.086,5.275-13.95,13.346-16.474,22.67l-13.548,50.04c-1.485,5.524-6.513,9.324-12.16,9.317l-0.751-0.02l-0.189-0.006 l-51.474-2.566h0.036c-0.634-0.039-1.303-0.052-2.004-0.059c-8.968,0-17.685,3.069-24.694,8.717l-3.47,2.801l-36.897,29.721 c-2.324,1.874-5.086,2.788-7.91,2.788c-2.82,0-5.586-0.914-7.913-2.788l-40.368-32.522c-7.006-5.641-15.719-8.71-24.69-8.71 c-0.601,0-1.303,0.007-2.106,0.052v0.007l-51.64,2.579l0.016-0.006l-0.652,0.013c-5.642,0.006-10.676-3.794-12.161-9.317 l-13.548-50.04c-2.524-9.324-8.387-17.394-16.474-22.67l-32.212-21.031l-11.194-7.313c-3.65-2.377-5.713-6.405-5.72-10.578 c0.003-1.496,0.265-2.997,0.826-4.466l18.461-48.454l-0.003,0.007c1.72-4.518,2.582-9.265,2.582-14.019 c0-4.753-0.858-9.506-2.582-14.018L38.848,195.33l-0.679-1.776c-0.565-1.489-0.826-2.997-0.83-4.492 c0.007-4.172,2.067-8.188,5.716-10.564l43.414-28.343l0.007-0.007c8.082-5.288,13.94-13.352,16.464-22.67l13.548-50.047 c1.482-5.517,6.523-9.324,12.161-9.317l0.503,0.006l51.91,2.592l0.056,0.007c0.63,0.026,1.264,0.04,1.894,0.046 c8.968,0,17.688-3.063,24.701-8.704l40.386-32.529c2.321-1.874,5.08-2.782,7.904-2.788c2.821,0,5.583,0.914,7.907,2.788 l-2.602-2.096l42.979,34.618c7.022,5.654,15.752,8.704,24.707,8.704c0.666,0,1.263-0.02,1.792-0.033h-0.14l52.075-2.599h0.035 l0.601-0.013c5.641-0.007,10.678,3.8,12.16,9.317l13.548,50.047c2.524,9.317,8.38,17.381,16.464,22.67l49.018,32.006l-5.602-3.656 c3.653,2.377,5.71,6.392,5.716,10.558c0,1.496-0.264,2.998-0.832,4.492l-20.832,54.683L455.38,241.988z"></path>
                        <path d="M196.151,226.298l-13.784,2.709c-0.725,0.15-1.123,0.725-0.979,1.463l10.254,52.175l-0.597,0.124 l-39.528-46.423c-0.653-0.757-1.45-0.986-2.305-0.816l-14.636,2.88c-0.725,0.144-1.123,0.718-0.966,1.455l15.817,80.448 c0.14,0.738,0.725,1.136,1.45,0.992l13.783-2.71c0.725-0.15,1.123-0.731,0.983-1.469l-10.242-52.051l0.61-0.118l39.613,46.28 c0.653,0.757,1.338,0.999,2.318,0.816l14.509-2.86c0.724-0.144,1.122-0.725,0.966-1.463l-15.814-80.454 C197.46,226.54,196.876,226.155,196.151,226.298z"></path>
                        <path d="M280.868,279.649l-35.731,7.026c-0.483,0.105-0.78-0.091-0.865-0.581l-3.385-17.192 c-0.102-0.483,0.098-0.77,0.581-0.874l29.757-5.85c0.725-0.144,1.123-0.719,0.983-1.449l-2.546-12.922 c-0.144-0.724-0.728-1.123-1.453-0.986l-29.754,5.857c-0.484,0.091-0.784-0.111-0.881-0.594l-3.232-16.454 c-0.098-0.49,0.101-0.784,0.584-0.875l35.731-7.026c0.725-0.144,1.123-0.725,0.966-1.456l-2.56-13.038 c-0.144-0.738-0.725-1.13-1.453-0.986l-53.152,10.454c-7.006,5.654-15.752,8.704-24.707,8.704c-0.666,0-1.263,0.02-1.792,0.033h-0.14l-52.075,2.599h-0.035 l-0.601,0.013c-5.641,0.007-10.678,3.8-12.16,9.317l-13.548,50.047c-2.524,9.317-8.38,17.381-16.464,22.67l-49.018,32.006l5.602,3.656 c-3.653,2.377-5.71,6.392-5.716,10.558c0,1.496,0.264,2.998,0.832,4.492l20.832,54.683L280.868,279.649z"></path>
                        <path d="M377.221,190.694l-15.605,3.068c-0.852,0.164-1.266,0.634-1.224,1.515l-1.221,54.291l-0.258,0.046 l-24.847-49.16c-0.398-0.699-0.983-1.084-1.708-0.94l-10.61,2.083c-0.839,0.17-1.237,0.744-1.338,1.541l-3.911,54.82l-0.242,0.052 l-22.19-49.701c-0.255-0.718-0.839-1.096-1.691-0.927l-15.732,3.082c-0.852,0.17-0.996,0.706-0.725,1.417l37.266,76.23 c0.398,0.685,0.98,1.084,1.708,0.94l12.19-2.403c0.852-0.163,1.25-0.751,1.348-1.528l4.368-54.415l0.242-0.045l24.521,48.728 c0.385,0.685,0.97,1.084,1.822,0.914l12.19-2.403c0.852-0.157,1.365-0.77,1.352-1.535l5.504-84.645 C378.4,190.955,378.073,190.524,377.221,190.694z"></path>
                      </g>
                    </svg>
                  )}
                </div>
                <div className="navbar-notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-actions">
                    <span className="notification-time">{notification.time}</span>
                    <button 
                      className="mark-read-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                    >
                      Mark as read
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notifications">
              <p>No notifications yet</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarNotification