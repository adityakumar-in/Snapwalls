'use client'
import { useState, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import Login from './Login';
import '@/app/styles/signup.css';

const EyeIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Signup({ onClose = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    let verificationChecker;
    if (verificationSent) {
      verificationChecker = setInterval(async () => {
        try {
          await auth.currentUser?.reload();
          if (auth.currentUser?.emailVerified) {
            clearInterval(verificationChecker);
            await signInWithEmailAndPassword(auth, email, password);
            setVerificationSent(false);
            setShowSuccessPopup(true);
            setTimeout(() => {
              setShowSuccessPopup(false);
              router.push('/');
              onClose();
            }, 3000);
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }
      }, 5000);
    }

    return () => {
      if (verificationChecker) {
        clearInterval(verificationChecker);
      }
    };
  }, [verificationSent, router, onClose, email, password]);

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user.emailVerified) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          setShowSuccessPopup(false);
          router.push('/');
          onClose();
        }, 3000);
      } else {
        await sendEmailVerification(result.user);
        setVerificationSent(true);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setResendDisabled(true);
      setTimeout(() => setResendDisabled(false), 60000); // Enable resend after 1 minute
      setError("Verification email resent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginSignup = () => {
    setShowLogin(!showLogin);
  };

  if (showLogin) {
    return <Login onSwitchToSignup={toggleLoginSignup} onClose={onClose} />;
  }

  return (
    <div className="overlay" onClick={handleOutsideClick}>
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h1 className="title">{verificationSent ? "Verify Your Email" : "Sign Up"}</h1>
        {verificationSent ? (
          <div className="verification-message">
            <div className="verification-icon">
              <FaEnvelope />
            </div>
            <p>A verification email has been sent to:</p>
            <p className="verification-email">{email}</p>
            <p>Please check your inbox and click the verification link.</p>
            <div className="verification-notes">
              <p>Once verified, you will be automatically logged in and redirected.</p>
              <p>You can close this window and come back later if needed.</p>
            </div>
            <button 
              onClick={handleResendVerification} 
              disabled={resendDisabled}
              className="button resend-button"
            >
              Resend Verification Email
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleEmailSignup} className="form">
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
              <button type="submit" className="button primary-button">Sign Up with Email</button>
            </form>
            <div className="social-buttons">
              <button onClick={() => handleSocialSignup(googleProvider)} className="button google-button">
                Sign Up with Google
              </button>
              <button onClick={() => handleSocialSignup(githubProvider)} className="button github-button">
                Sign Up with GitHub
              </button>
            </div>
            <p className="login-link">
              Already have an account? <button onClick={toggleLoginSignup} className="link-button">Log in</button>
            </p>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {showSuccessPopup && (
        <div className="success-popup">
          <FaCheckCircle className="success-icon" />
          <h2>Successfully Logged In!</h2>
          <p>Welcome to our platform. You'll be redirected shortly.</p>
        </div>
      )}
    </div>
  );
}