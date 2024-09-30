'use client'
import { useState, useRef } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import '@/app/styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
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
        router.push('/dashboard');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
          />
          <button type="submit" className="button primary-button">Log In with Email</button>
        </form>
        <div className="social-buttons">
          <button onClick={handleGoogleLogin} className="button google-button">
            Log In with Google
          </button>
          <button onClick={handleGithubLogin} className="button github-button">
            Log In with GitHub
          </button>
          
        </div>
        <div className="error-container">
            {error && <p className="error">{error}</p>}
          </div>
      </div>
    </div>
  );
}