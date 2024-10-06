"use client"
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaEnvelope, FaCheckCircle, FaLock, FaArrowLeft } from 'react-icons/fa';
import Signup from './Signup';
import '@/app/styles/login.css';
import { useRouter } from 'next/navigation';

const EyeIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
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
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        router.push('/');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setVerificationSent(true);
        await sendEmailVerification(userCredential.user);
        setError("Please verify your email before logging in. A new verification email has been sent.");
      } else {
        setShowSuccessNotification(true);
        setTimeout(() => {
          setShowSuccessNotification(false);
          onClose();
          router.push(currentPath);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.emailVerified) {
        setShowSuccessNotification(true);
        setTimeout(() => {
          setShowSuccessNotification(false);
          onClose();
          router.push(currentPath);
        }, 3000);
      } else {
        await auth.signOut();
        setVerificationSent(true);
        await sendEmailVerification(result.user);
        setError("Please verify your email before logging in. A verification email has been sent.");
      }
    } catch (error) {
      setError(error.message);
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

  if (showSignup) {
    return <Signup onSwitchToLogin={toggleLoginSignup} onClose={onClose} currentPath={currentPath} />;
  }

  return (
    <div className="overlay">
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h1 className="title">{showForgotPassword ? "Reset Password" : "Log In"}</h1>
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
              <button type="submit" className="button primary-button">
                <FaEnvelope className="button-icon" />
                <span>Log In with Email</span>
              </button>
            </form>
            <button onClick={() => setShowForgotPassword(true)} className="forgot-password-link">Forgot Password?</button>
            <div className="social-buttons">
              <button onClick={() => handleSocialLogin(googleProvider)} className="button google-button">
                <FaGoogle className="social-icon" />
                <span>Log In with Google</span>
              </button>
              <button onClick={() => handleSocialLogin(githubProvider)} className="button github-button">
                <FaGithub className="social-icon" />
                <span>Log In with GitHub</span>
              </button>
            </div>
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
                <form onSubmit={handleForgotPassword} className="form">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="input"
                  />
                  <button type="submit" className="button primary-button">
                    <span>Send Reset Link</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="reset-password-success">
                <FaCheckCircle className="success-icon" />
                <h2>Reset Link Sent</h2>
                <p>Please check your email for instructions to reset your password.</p>
              </div>
            )}
            <button onClick={() => {
              setShowForgotPassword(false);
              setResetPasswordSuccess(false);
            }} className="back-to-login">
              <FaArrowLeft /> Back to Login
            </button>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {showSuccessNotification && (
        <div className="success-notification">
          <div className="success-content">
            <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span className="success-message">Successfully Logged In</span>
          </div>
        </div>
      )}
      {verificationSent && (
        <div className="verification-&& message">
          <FaEnvelope className="verification-icon" />
          <h2>Verify Your Email</h2>
          <p>A verification email has been sent to your email address.</p>
          <p>Please check your inbox and click the verification link to complete the login process.</p>
        </div>
      )}
      
    </div>
  );
}