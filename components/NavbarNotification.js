import React, { useRef, useEffect, useState } from 'react'
import '/app/styles/navbarNotification.css'
import { ref, onValue, update } from 'firebase/database'
import { db } from '/components/firebase.config'
import { useAuth } from '/context/AuthContext'

const NavbarNotification = ({ isActive, onClose }) => {
  const notificationRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  // Calculate time difference
  const getTimeAgo = (timestamp) => {
    const now = new Date('2024-12-28T00:31:58+05:30').getTime();
    const then = new Date(timestamp).getTime();
    const difference = now - then;

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  // Fetch notifications from Firebase
  useEffect(() => {
    if (!user) return;

    const userNotificationsRef = ref(db, `users/${user.uid}/notifications`);
    const globalNotificationsRef = ref(db, 'notifications');

    // Listen to user-specific notifications
    const userUnsubscribe = onValue(userNotificationsRef, (snapshot) => {
      const userNotifs = [];
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        userNotifs.push({
          id: childSnapshot.key,
          ...notification,
          time: getTimeAgo(notification.timestamp)
        });
      });
      setNotifications(userNotifs);
    });

    // Listen to global notifications
    const globalUnsubscribe = onValue(globalNotificationsRef, (snapshot) => {
      const globalNotifs = [];
      snapshot.forEach((childSnapshot) => {
        const notification = childSnapshot.val();
        if (notification.forUser === user.uid) {
          globalNotifs.push({
            id: childSnapshot.key,
            ...notification,
            time: getTimeAgo(notification.timestamp)
          });
        }
      });
      setNotifications(prev => [...prev, ...globalNotifs].sort((a, b) => b.timestamp - a.timestamp));
    });

    return () => {
      userUnsubscribe();
      globalUnsubscribe();
    };
  }, [user]);

  // Mark notification as read
  const markAsRead = async (notificationId, isUserSpecific) => {
    if (!user) return;
    
    const path = isUserSpecific 
      ? `users/${user.uid}/notifications/${notificationId}`
      : `notifications/${notificationId}`;
    
    await update(ref(db, path), {
      isRead: true
    });
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

  const handleContainerClick = (e) => {
    // Stop event propagation to prevent navbar icon click
    e.stopPropagation();
  };

  useEffect(() => {
    const panel = notificationRef.current;
    if (!panel) return;

    let isDragging = false;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startY.current = touch.clientY;
      currentY.current = touch.clientY;
      isDragging = true;
      panel.style.transition = 'none';
      // Stop propagation for touch events
      e.stopPropagation();
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
      // Stop propagation for touch events
      e.stopPropagation();
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
      // Stop propagation for touch events
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
        ref={notificationRef}
        className={`navbar-notification-container ${isActive ? 'active' : ''}`}
        onClick={handleContainerClick}
      >
        <div className="navbar-notification-header">
          <div className="navbar-notification-header-content">
            <h3>Notifications</h3>
            <button className="mark-all-read">Mark all as read</button>
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
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification.id, notification.forUser === user.uid)}
              >
                <div className="notification-icon">
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
                </div>
                <div className="notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
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
  )
}

export default NavbarNotification