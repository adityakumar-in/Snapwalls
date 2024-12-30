"use client"
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider, twitterProvider } from '../components/firebase.config';
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaCheckCircle, FaLock, FaArrowLeft } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Signup from './Signup';
import '@/app/styles/login.css';
import { useRouter } from 'next/navigation';

export default function Login({ onClose = () => { }, currentPath = '/' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('modal-open');
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      document.body.classList.remove('modal-open');
      onClose();
    }, 300);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setVerificationSent(true);
        await sendEmailVerification(userCredential.user);
      } else {
        setNotificationMessage('Successfully logged in!');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
          onClose();
          router.push(currentPath);
        }, 5000);
      }
    } catch (error) {
      setError("Unable to log in. Please check your credentials and try again.");
    }
  };
  const handleSocialLogin = async (provider) => {
    try {
      if (provider === twitterProvider) {
        provider.setCustomParameters({
          lang: 'en'
        });
      }
      
      const result = await signInWithPopup(auth, provider);
      setNotificationMessage('Successfully logged in!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        onClose();
        router.push(currentPath);
      }, 5000);
    } catch (error) {
      console.error('Social login error details:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      
      let errorMessage = "Unable to complete social login. Please try again.";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Login popup was closed. Please try again.";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Login popup was blocked. Please allow popups for this site.";
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = "Login process was cancelled. Please try again.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = "An account already exists with the same email address but different sign-in credentials.";
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "Twitter login is not enabled. Please contact support.";
      } else if (error.code === 'auth/internal-error') {
        errorMessage = "Authentication service is experiencing issues. This might be due to incorrect Twitter API configuration. Please try again later or use another login method.";
      }
      
      setError(errorMessage);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetPasswordSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginSignup = () => {
    setShowSignup(!showSignup);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (showSignup) {
    return <Signup onSwitchToLogin={toggleLoginSignup} onClose={handleClose} currentPath={currentPath} />;
  }

  return (
    <div className={`overlay ${isClosing ? 'closing' : ''}`} onClick={handleOutsideClick}>
      <div className={`container ${isClosing ? 'closing' : ''}`} ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>&times;</button>
        <h1 className="login-title">{showForgotPassword ? "Reset Password" : "Log In"}</h1>
        {!showForgotPassword ? (
          <>
            <div className="social-buttons">
              <button onClick={() => handleSocialLogin(googleProvider)} className="social-button google-button">
                <FaGoogle className="social-icon" />
                <span>Google</span>
              </button>
              <button onClick={() => handleSocialLogin(twitterProvider)} className="social-button twitter-button">
                <FaXTwitter className="social-icon" />
                <span>Twitter</span>
              </button>
            </div>
            <div className="divider">or continue with</div>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button type="submit" className="button primary-button">
                <FaEnvelope className="button-icon" />
                <span>Log In with Email</span>
              </button>
            </form>
            <button onClick={() => setShowForgotPassword(true)} className="forgot-password-link">Forgot Password?</button>
            <p className="signup-prompt">
              Don't have an account? <button onClick={toggleLoginSignup} className="switch-button">Sign Up</button>
            </p>
          </>
        ) : (
          <div className="reset-password-container">
            {!resetPasswordSuccess ? (
              <>
                <div className="reset-password-icon">
                  <FaLock />
                </div>
                <div className="reset-password-header">
                  {/* <h2>Reset Your Password</h2> */}
                  <p>Enter your email address and we'll send you instructions to reset your password.</p>
                </div>
                <form onSubmit={handleForgotPassword} className="form">
                  <div className="input-group">
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="input"
                    />
                  </div>
                  <button type="submit" className="button primary-button">
                    <FaEnvelope className="button-icon" />
                    <span>Send Reset Link</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="reset-password-success">
                <FaCheckCircle className="success-icon" />
                <h2>Reset Link Sent!</h2>
                <p>We've sent password reset instructions to your email address. Please check your inbox and follow the instructions to reset your password.</p>
              </div>
            )}
            <button 
              onClick={() => {
                setShowForgotPassword(false);
                setResetPasswordSuccess(false);
                setResetEmail('');
                setError(null);
              }} 
              className="back-to-login"
            >
              <FaArrowLeft />
              <span>Back to Login</span>
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {showNotification && (
        <div className="login-notification">
          <span className="icon">✓</span>
          <span className="message">{notificationMessage}</span>
        </div>
      )}
      {verificationSent && (
        <div className="verification-message">
          <FaEnvelope className="verification-icon" />
          <h2>Verify Your Email</h2>
          <p>A verification email has been sent to your email address.</p>
          <p>Please check your inbox and click the verification link to complete the login process.</p>
        </div>
      )}
      
    </div>
  );
}