import { useState, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../components/Authentication';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaCheckCircle, FaEnvelope, FaGoogle, FaGithub, FaTimes } from 'react-icons/fa';
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
  const [isClosing, setIsClosing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const router = useRouter();
  const modalRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
    return "";
  };

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
    
    // Validate email and password
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }

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
      handleClose();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleLoginSignup = () => {
    setShowLogin(!showLogin);
  };

  const handleClose = () => {
    if (verificationSent) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Only show validation after user starts typing
    if (!hasStartedTyping && value.length > 0) {
      setHasStartedTyping(true);
    }
    
    // Only show password error if user has started typing
    if (hasStartedTyping) {
      setPasswordError(validatePassword(value));
    }
    
    // Calculate password strength
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[!@#$%^&*]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  if (showLogin) {
    return <Login onSwitchToSignup={toggleLoginSignup} onClose={handleClose} currentPath={currentPath} />;
  }

  return (
    <div className={`overlay ${isClosing ? 'closing' : ''}`} onClick={handleOutsideClick}>
      <div className={`container ${isClosing ? 'closing' : ''}`} ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose} disabled={verificationSent}>&times;</button>
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
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  required
                  className={`input ${emailError ? 'input-error' : ''}`}
                />
                {emailError && <div className="error-message">{emailError}</div>}
              </div>
              
              <div className="input-group">
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    required
                    className={`input ${hasStartedTyping && passwordError ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="password-toggle-button"
                  >
                    {showPassword ? <FaEyeSlash /> : <EyeIcon />}
                  </button>
                </div>
                {hasStartedTyping && passwordError && <div className="error-message">{passwordError}</div>}
                
                {hasStartedTyping && (
                  <>
                    <div className="password-strength">
                      <div className="strength-label">
                        <span className="strength-text">Password Strength</span>
                        <span className={`strength-value strength-${passwordStrength}`}>
                          {passwordStrength === 0 && "Very Weak"}
                          {passwordStrength === 1 && "Weak"}
                          {passwordStrength === 2 && "Fair"}
                          {passwordStrength === 3 && "Good"}
                          {passwordStrength === 4 && "Strong"}
                          {passwordStrength === 5 && "Very Strong"}
                        </span>
                      </div>
                      <style jsx>{`
                        .password-strength-progress {
                          width: ${passwordStrength * 20}%;
                          --strength-color-start: ${
                            passwordStrength <= 1 ? '#e74c3c' :
                            passwordStrength === 2 ? '#f39c12' :
                            passwordStrength === 3 ? '#f1c40f' :
                            passwordStrength === 4 ? '#2ecc71' :
                            '#27ae60'
                          };
                          --strength-color-end: ${
                            passwordStrength <= 1 ? '#c0392b' :
                            passwordStrength === 2 ? '#d35400' :
                            passwordStrength === 3 ? '#f39c12' :
                            passwordStrength === 4 ? '#27ae60' :
                            '#219a52'
                          };
                        }
                      `}</style>
                      <div className="password-strength-bar">
                        <div className="password-strength-progress" />
                      </div>
                    </div>
                    
                    <div className="requirements-container">
                      <div className={`requirement-tag ${password.length >= 8 ? 'met' : 'unmet'}`}>
                        {password.length >= 8 ? <FaCheckCircle /> : <FaTimes />}
                        <span>8+ chars</span>
                      </div>
                      <div className={`requirement-tag ${/[A-Z]/.test(password) ? 'met' : 'unmet'}`}>
                        {/[A-Z]/.test(password) ? <FaCheckCircle /> : <FaTimes />}
                        <span>Uppercase</span>
                      </div>
                      <div className={`requirement-tag ${/[a-z]/.test(password) ? 'met' : 'unmet'}`}>
                        {/[a-z]/.test(password) ? <FaCheckCircle /> : <FaTimes />}
                        <span>Lowercase</span>
                      </div>
                      <div className={`requirement-tag ${/[0-9]/.test(password) ? 'met' : 'unmet'}`}>
                        {/[0-9]/.test(password) ? <FaCheckCircle /> : <FaTimes />}
                        <span>Number</span>
                      </div>
                      <div className={`requirement-tag ${/[!@#$%^&*]/.test(password) ? 'met' : 'unmet'}`}>
                        {/[!@#$%^&*]/.test(password) ? <FaCheckCircle /> : <FaTimes />}
                        <span>Special</span>
                      </div>
                    </div>
                  </>
                )}
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