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

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const event = new CustomEvent('unreadNotificationsCount', { detail: unreadCount });
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

    // Fetch global notifications
    const globalNotificationsRef = ref(db, 'notification');
    const globalUnsubscribe = onValue(globalNotificationsRef, (snapshot) => {
      const globalNotifs = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const notification = childSnapshot.val();
          // Only include unread notifications
          if (!notification.isRead) {
            globalNotifs.push({
              id: childSnapshot.key,
              source: 'global',
              ...notification,
              time: getTimeAgo(notification.timestamp)
            });
          }
        });
      }

      // Fetch user-specific notifications
      const userNotificationsRef = ref(db, `users/${user.uid}/notification`);
      const userUnsubscribe = onValue(userNotificationsRef, (snapshot) => {
        const userNotifs = [];
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const notification = childSnapshot.val();
            userNotifs.push({
              id: childSnapshot.key,
              source: 'user',
              ...notification,
              time: getTimeAgo(notification.timestamp)
            });
          });
        }

        // Combine and sort all notifications
        const allNotifications = [...globalNotifs, ...userNotifs].sort((a, b) => 
          b.timestamp - a.timestamp
        );
        setNotifications(allNotifications);
      });

      return () => userUnsubscribe();
    });

    return () => globalUnsubscribe();
  }, [user]);

  // Mark single notification as read
  const markAsRead = async (notificationId, source) => {
    if (!user) return;
    
    try {
      if (source === 'user') {
        // Delete user-specific notification
        await remove(ref(db, `users/${user.uid}/notification/${notificationId}`));
      } else {
        // Mark global notification as read
        await update(ref(db, `notification/${notificationId}`), {
          isRead: true
        });
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const batch = [];

      // Handle user notifications - delete them all
      const userNotifs = notifications.filter(n => n.source === 'user');
      userNotifs.forEach(notif => {
        const userNotifRef = ref(db, `users/${user.uid}/notification/${notif.id}`);
        batch.push(remove(userNotifRef));
      });

      // Handle global notifications - mark them as read
      const globalNotifs = notifications.filter(n => n.source === 'global');
      globalNotifs.forEach(notif => {
        const globalNotifRef = ref(db, `notification/${notif.id}`);
        batch.push(update(globalNotifRef, { isRead: true }));
      });

      // Execute all updates in parallel
      await Promise.all(batch);

      // Update local state to reflect changes
      setNotifications(prevNotifs => 
        prevNotifs.filter(notif => notif.source !== 'user')
          .map(notif => ({
            ...notif,
            isRead: true
          }))
      );

    } catch (error) {
      console.error('Error marking all notifications as read:', error);
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
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
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
                </div>
                <div className="navbar-notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-actions">
                    <span className="notification-time">{notification.time}</span>
                    {!notification.isRead && (
                      <button 
                        className="mark-read-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id, notification.source);
                        }}
                      >
                        Mark as read
                      </button>
                    )}
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