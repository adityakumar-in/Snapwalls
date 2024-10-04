import { useState, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaCheckCircle, FaEnvelope, FaGoogle, FaGithub } from 'react-icons/fa';
import Login from './Login';
import '@/app/styles/signup.css';
import '@/app/styles/login.css';

const EyeIcon = () => (
  <svg className="eye-icon" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Signup({ onClose = () => { }, currentPath = '/' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    let intervalId;
    if (verificationSent && !isEmailVerified) {
      intervalId = setInterval(async () => {
        try {
          await auth.currentUser?.reload();
          if (auth.currentUser?.emailVerified) {
            clearInterval(intervalId);
            setIsEmailVerified(true);
            setShowSuccessNotification(true);
            setTimeout(() => {
              setShowSuccessNotification(false);
              onClose();
              router.push(currentPath);
            }, 3000);
          }
        } catch (error) {
          console.error("Error checking email verification:", error);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [verificationSent, isEmailVerified, onClose, router, currentPath]);

  useEffect(() => {
    let cooldownTimer;
    if (resendCooldown > 0) {
      cooldownTimer = setInterval(() => {
        setResendCooldown((prevCooldown) => prevCooldown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => {
      if (cooldownTimer) {
        clearInterval(cooldownTimer);
      }
    };
  }, [resendCooldown]);

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
        setShowSuccessNotification(true);
        setTimeout(() => {
          setShowSuccessNotification(false);
          router.push(currentPath);
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
    if (resendDisabled) {
      return;
    }

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(auth.currentUser);
      
      // Sign out the user
      await auth.signOut();
      
      setResendDisabled(true);
      setResendCooldown(60); // Set cooldown to 60 seconds
      setError("Verification email resent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !verificationSent) {
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
    return <Login onSwitchToSignup={toggleLoginSignup} onClose={onClose} currentPath={currentPath} />;
  }

  return (
    <div className="overlay" onClick={handleOutsideClick}>
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={onClose} disabled={verificationSent}>&times;</button>
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
              <p>You need to verify your email before you can proceed.</p>
              <p>This window will automatically close once your email is verified.</p>
            </div>
            <button
              onClick={handleResendVerification}
              disabled={resendDisabled}
              className="button resend-button"
            >
              {resendDisabled
                ? `Resend in ${resendCooldown}s`
                : "Resend Verification Email"}
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
              <button type="submit" className="button primary-button">
                <FaEnvelope className="button-icon" />
                <span>Sign Up with Email</span>
              </button>
            </form>
            <div className="social-buttons">
              <button onClick={() => handleSocialSignup(googleProvider)} className="button google-button">
                <FaGoogle className="social-icon" />
                <span>Sign Up with Google</span>
              </button>
              <button onClick={() => handleSocialSignup(githubProvider)} className="button github-button">
                <FaGithub className="social-icon" />
                <span>Sign Up with GitHub</span>
              </button>
            </div>
            <p className="login-link">
              Already have an account? <button onClick={toggleLoginSignup} className="link-button">Log in</button>
            </p>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {showSuccessNotification && (
        <div className="success-notification">
          <FaCheckCircle className="success-icon" />
          <div className="success-message">
            <h2>Successfully Signed Up!</h2>
            <p>Welcome to our platform.</p>
          </div>
        </div>
      )}
    </div>
  );
}