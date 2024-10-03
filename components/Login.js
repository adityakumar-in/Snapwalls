'use client'
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '@/app/styles/login.css';

const EyeIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Login({ onClose = () => {}, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && typeof onClose === 'function') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setError("Please verify your email first");
      } else {
        setNotification("Logged in successfully!");
        setTimeout(() => {
          router.push('/');
          if (typeof onClose === 'function') onClose();
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      setNotification(`Logged in successfully with ${provider.providerId}!`);
      setTimeout(() => {
        router.push('/');
        if (typeof onClose === 'function') onClose();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setNotification("Password reset email sent. Please check your inbox.");
      setResetEmail('');
      setTimeout(() => setShowForgotPassword(false), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="overlay">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={() => typeof onClose === 'function' && onClose()}>&times;</button>
        <h1 className="title">Log In</h1>
        {!showForgotPassword ? (
          <>
            <form onSubmit={handleEmailLogin} className="form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input"
              />
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="input"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle-button"
                >
                  {showPassword ? <FaEyeSlash /> : <EyeIcon />}
                </button>
              </div>
              <button type="submit" className="button primary-button">Log In with Email</button>
            </form>
            <button onClick={() => setShowForgotPassword(true)} className="forgot-password-link">Forgot Password?</button>
            <div className="social-buttons">
              <button onClick={() => handleSocialLogin(googleProvider)} className="button google-button">
                Log In with Google
              </button>
              <button onClick={() => handleSocialLogin(githubProvider)} className="button github-button">
                Log In with GitHub
              </button>
            </div>
            <p className="signup-link">
              Don't have an account? <button onClick={onSwitchToSignup} className="link-button">Sign up</button>
            </p>
          </>
        ) : (
          <div className="forgot-password-content">
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="input"
              />
              <button type="submit" className="button primary-button">Send Reset Email</button>
            </form>
            <button onClick={() => setShowForgotPassword(false)} className="back-to-login">Back to Login</button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
} 