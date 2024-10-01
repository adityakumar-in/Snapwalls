'use client'
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import SignUp from './Signup';  // Import the SignUp component
import '@/app/styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        setError("*Please verify email first");
      } else {
        setNotification("Logged in successfully!");
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setNotification("Logged in successfully with Google!");
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      setNotification("Logged in successfully with GitHub!");
      setTimeout(() => {
        router.push('/dashboard');
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
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      router.push('/');
    }
  };

  const handleCloseClick = () => {
    router.push('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        if (showForgotPassword) {
          setShowForgotPassword(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, showForgotPassword]);

  if (showSignUp) {
    return <SignUp onBackToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="overlay" onClick={handleOutsideClick}>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={handleCloseClick}>&times;</button>
        {!showForgotPassword ? (
          <>
            <h1 className="title">Log In</h1>
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
                  className="password-toggle-btn"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <button type="submit" className="button primary-button">Log In with Email</button>
              <a href="#" onClick={() => setShowForgotPassword(true)} className="forgot-password-link">Forgot Password?</a>
            </form>
            <div className="social-buttons">
              <button onClick={handleGoogleLogin} className="button google-button">
                Log In with Google
              </button>
              <button onClick={handleGithubLogin} className="button github-button">
                Log In with GitHub
              </button>
            </div>
            <p className="signup-prompt">
              Don't have an account? <a href="#" onClick={handleSignUpClick}>Sign up</a>
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
              <button onClick={() => setShowForgotPassword(false)} className="button secondary-button">Back to Login</button>
            </form>
          </div>
        )}

        <div className="error-container">
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
}