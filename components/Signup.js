'use client'
import { useState, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import '@/app/styles/signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    let countdownTimer;
    let verificationChecker;

    if (verificationSent) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownTimer);
            router.push('/login');
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      verificationChecker = setInterval(() => {
        auth.currentUser?.reload().then(() => {
          if (auth.currentUser?.emailVerified) {
            clearInterval(countdownTimer);
            clearInterval(verificationChecker);
            router.push('/home');
          }
        });
      }, 1000);

      return () => {
        clearInterval(countdownTimer);
        clearInterval(verificationChecker);
      };
    }
  }, [verificationSent, router]);

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

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push('/dashboard');
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

  return (
    <div className="overlay" onClick={handleOutsideClick}>
      <div className="container" ref={modalRef}>
        <button className="close-button" onClick={handleCloseClick}>&times;</button>
        <h1 className="title">Sign Up</h1>
        {verificationSent ? (
          <div className="form">
            <p>A verification email has been sent to {email}. Please check your inbox and verify your email address.</p>
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
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input"
              />
              <button type="submit" className="button primary-button">Sign Up with Email</button>
            </form>
            <div className="social-buttons">
              <button onClick={handleGoogleSignup} className="button google-button">
                Sign Up with Google
              </button>
              <button onClick={handleGithubSignup} className="button github-button">
                Sign Up with GitHub
              </button>
            </div>
          </>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      {verificationSent && (
        <div className={`notification ${countdown === 0 ? 'hide' : ''}`}>
          Redirecting in {countdown} seconds...
        </div>
      )}
    </div>
  );
}