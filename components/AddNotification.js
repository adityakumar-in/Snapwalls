'use client'
import React, { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '/components/firebase.config';
import '/app/styles/addNotification.css';

const AddNotification = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('like');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const notificationRef = ref(db, 'notification');
      await push(notificationRef, {
        message,
        type,
        timestamp: Date.now(),
        isRead: false
      });
      
      setMessage('');
      setType('like');
      onClose();
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <h2 className="notification-modal-title">Add Global Notification</h2>
        <form onSubmit={handleSubmit} className="notification-form">
          <div className="notification-form-group">
            <label className="notification-label">
              Message
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="notification-input"
                required
              />
            </label>
          </div>
          <div className="notification-form-group">
            <label className="notification-label">
              Type
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="notification-select"
              >
                <option value="like">Like</option>
                <option value="comment">Comment</option>
                <option value="follow">Follow</option>
                <option value="update">Update</option>
              </select>
            </label>
          </div>
          <div className="notification-buttons">
            <button
              type="button"
              onClick={onClose}
              className="notification-button notification-button-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="notification-button notification-button-submit"
            >
              Add Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotification;
