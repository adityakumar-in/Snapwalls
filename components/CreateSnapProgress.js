'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '/app/styles/createSnapProgress.css';

const CreateSnapProgress = ({ progress }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setShowSuccess(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="progress-overlay">
      <div className="progress-modal">
        <div className="glow-effect"></div>

        {showSuccess ? (
          <div className="success-container">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="100" height="100">
                <circle className="success-circle" cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path className="success-check" d="M7 13l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="success-title">Roadmap Created!</h2>
            <p className="success-message">Your personalized learning journey is ready</p>
          </div>
        ) : (
          <div className="loading-container">
            {/* Loader GIF Container */}
            <div className="loader-wrapper">
              <img 
                src="/loader.gif" 
                alt="Loading..."
                className="loader-gif"
              />
              <div className="progress-indicator">
                <svg viewBox="0 0 100 100" className="progress-svg">
                  <circle
                    className="progress-circle-bg"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="5"
                  />
                  <circle
                    className="progress-circle-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="5"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 45}`,
                      strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
                    }}
                  />
                </svg>
              </div>
              <div className="progress-badge">
                {Math.round(progress)}%
              </div>
            </div>

            {/* Status Information */}
            <div className="status-container">
              <h3 className="status-title">Creating Your Wallpaper</h3>
              <div className="status-bar">
                <div 
                  className="status-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="status-glow"></div>
                </div>
              </div>
              <p className="status-text">
                {progress < 25 && "Analyzing image details..."}
                {progress >= 25 && progress < 50 && "Enhancing image quality..."}
                {progress >= 50 && progress < 75 && "Optimizing for your device..."}
                {progress >= 75 && progress < 90 && "Adding finishing touches..."}
                {progress >= 90 && progress < 100 && "Preparing download..."}
                {progress === 100 && "Wallpaper ready!"}
              </p>
            </div>

            {/* Loading Dots */}
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSnapProgress;
