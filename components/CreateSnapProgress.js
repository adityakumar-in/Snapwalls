'use client'
import React, { useEffect, useState } from 'react';
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
        {/* Glowing Background Effect */}
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
          <>

            {/* Main Progress Circle */}
            <div className="progress-circle">
              <svg className="progress-ring" viewBox="0 0 160 160" width="160" height="160">
                <circle
                  className="progress-ring-bg"
                  strokeWidth="6"
                  fill="transparent"
                  r="74"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="progress-ring-fill"
                  strokeWidth="6"
                  fill="transparent"
                  r="74"
                  cx="80"
                  cy="80"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 74}`,
                    strokeDashoffset: `${2 * Math.PI * 74 * (1 - progress / 100)}`
                  }}
                />
              </svg>
              <div className="progress-number-wrapper">
                <div className="progress-number">
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>
            </div>

            {/* Progress Information */}
            <div className="progress-info">
              <h3>Creating Your Roadmap</h3>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="progress-glow"></div>
                </div>
              </div>
              <p className="status-text">
                {progress < 33 && "Analyzing your learning goals..."}
                {progress >= 33 && progress < 66 && "Crafting personalized milestones..."}
                {progress >= 66 && progress < 100 && "Optimizing your learning journey..."}
                {progress === 100 && "Almost ready!"}
              </p>
            </div>

            {/* Animated Dots */}
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateSnapProgress;
