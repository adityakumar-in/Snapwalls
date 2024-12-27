'use client'
import { React, useState, useEffect, useRef } from 'react'
import '/app/styles/navbar.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Login from './Login'
import { signOut } from 'firebase/auth'
import { ref, set, remove, get, onValue } from 'firebase/database'
import { db, auth, getCurrentUserEmailName } from '/components/firebase.config' // Make sure this path is correct
import NavbarNotification from './NavbarNotification'

const Navbar = () => {
  const path = usePathname()

  const [notificationActive, setNotificationActive] = useState(false)
  const [logoutActive, setLogoutActive] = useState(false)
  const [loginActive, setLoginActive] = useState(false)
  const [siteActive, setSiteActive] = useState(false)
  const [profileActive, setProfileActive] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showLogoutNotification, setShowLogoutNotification] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showProf, setShowProf] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const closeRef = useRef(null);
  const siteRef = useRef(null);
  const navbarRef = useRef(null);

  // Add this check before using auth
  useEffect(() => {
    if (!auth) {
      console.error('Auth object is not initialized');
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await user.reload();
        setTimeout(() => {
          setIsLoggedIn(user.emailVerified);
          setUserEmail(user.email || 'john.doe@example.com');
          setUserName(getCurrentUserEmailName() || user.displayName || 'John Doe');
          if (user.emailVerified) {
            setShowLogin(false);
            setShowSignup(false);
          }
        }, 1000);

        // Check if the user is created
        const userRef = ref(db, `users/${user.uid}/isCreated`);
        onValue(userRef, (snapshot) => {
          const isCreated = snapshot.val();
          setIsCreated(isCreated === true);
        });
      } else {
        setIsLoggedIn(false);
        setUserEmail(formatEmail('john.doe@example.com'));
        setUserName('John Doe');
        setIsCreated(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && window.innerWidth > 700 && siteActive) {
        setIsClosing(true);
        setTimeout(() => {
          setNotificationActive(false);
          setLogoutActive(false);
          setSiteActive(false);
          setProfileActive(false);
          setIsClosing(false);
        }, 500); // Match animation duration
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [siteActive]);

  const notificationHandler = () => {
    setNotificationActive(!notificationActive)
  }

  const loginHandler = () => {
    setLoginActive(!loginActive)
  }

  const siteHandler = () => {
    if (!siteActive) {
      setSiteActive(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setSiteActive(false);
        setIsClosing(false);
      }, 500);
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setLoginActive(true);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleShowProf = () => {
    setShowProf(!showProf);
  }

  const handleCloseModal = () => {
    setShowLogin(false);
    setShowSignup(false);
    setLoginActive(false);
  };

  useEffect(() => {
    if (path === '/profile') {
      // setProfileActive(true) // uncomment when using profile
      setProfileActive(false)
    } else {
      setProfileActive(false)
    }
  }, [path])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setLogoutActive(false);
      setShowLogoutNotification(true);
      setTimeout(() => {
        setShowLogoutNotification(false);
      }, 3000);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLoginSuccess = () => {
    setShowSuccessNotification(true);
    setShowLogin(false);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    handleShowProf();
  };

  const formatEmail = (email) => {
    if (!email) return 'john.doe@example.com';
    return email.length > 16 ? email.substring(0, 16) + '...' : email;
  };
  const formatName = (name) => {
    if (!name) return 'John Doe';
    const formattedName = name.length > 14 ? name.substring(0, 14) + '...' : name;
    return formattedName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  return (
    <div className="navbar-wrapper">
      <div ref={navbarRef} className={`navbar-container ${siteActive ? 'navbar-container-active' : ''} ${isClosing ? 'navbar-container-closing' : ''}`}>
        <div className="navbar-header">
          <div className="navbar-sitename" onClick={siteHandler}>
            <div className={`navbar-icon nav-sitename ${siteActive ? 'flip-icon' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.49997 12.4L5 17.7999" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.49997 12.4L5 7" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></path>
                  <line x1="18" y1="18" x2="10" y2="18" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></line>
                </g>
              </svg>
            </div>
            <Link href="/">
              <div className="nav-name nav-name-active">Snap<span className='nav-name-bold'>Walls</span></div>
            </Link>
          </div>

          <div className="navbar-items">
            <Link href="/home">
              <div className="navbar-home">
                <div className={path !== '/home' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
                <div className={path === '/home' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#FFB200" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495" stroke="#FFB200" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
                <div className={path === '/home' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Home</div>
              </div>
            </Link>

            <Link href="/explore">
              <div className="navbar-search">
                <div className={path !== '/explore' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#606060" stroke="#606060" strokeWidth="0.00048000000000000007"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>explore</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,6A18,18,0,1,1,6,24,18.1,18.1,0,0,1,24,6m0-4A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Z"></path> <path d="M33.3,13.3,20,20,13.3,33.3a1.1,1.1,0,0,0,1.4,1.4L28,28l6.7-13.3A1.1,1.1,0,0,0,33.3,13.3ZM24,26a2,2,0,1,1,2-2A2,2,0,0,1,24,26Z"></path> </g> </g> </g></svg>
                </div>
                <div className={path === '/explore' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#FFB200" stroke="#FFB200" strokeWidth="0.00048000000000000007"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>explore</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,6A18,18,0,1,1,6,24,18.1,18.1,0,0,1,24,6m0-4A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Z"></path> <path d="M33.3,13.3,20,20,13.3,33.3a1.1,1.1,0,0,0,1.4,1.4L28,28l6.7-13.3A1.1,1.1,0,0,0,33.3,13.3ZM24,26a2,2,0,1,1,2-2A2,2,0,0,1,24,26Z"></path> </g> </g> </g></svg>
                </div>
                <div className={path === '/explore' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Explore</div>
              </div>
            </Link>

              <Link href="/create">
                <div className="navbar-create">
                  <div className={path !== '/create' ? "navbar-icon nav-create" : "navbar-icon nav-create none"}>
                  <svg fill="#606060" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#606060" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.365 8.729c.9 0 1.635-.735 1.635-1.635s-.735-1.636-1.635-1.636-1.636.735-1.636 1.636.723 1.635 1.636 1.635m-4.907 5.452a3.27 3.27 0 1 0 0-6.542 3.27 3.27 0 0 0 0 6.542m0 8.722c2.105 0 3.816-1.711 3.816-3.829s-1.711-3.816-3.829-3.816a3.82 3.82 0 0 0-3.816 3.816 3.825 3.825 0 0 0 3.829 3.83M6.542 14.18a6.542 6.542 0 1 0 0-13.084 6.542 6.542 0 1 0 0 13.084"></path></g></svg>
                  </div>
                  <div className={path !== '/create' ? "navbar-icon nav-create nav-cr" : "navbar-icon nav-create none nav-cr"}>
                  <svg fill="#FFB200" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#606060" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.365 8.729c.9 0 1.635-.735 1.635-1.635s-.735-1.636-1.635-1.636-1.636.735-1.636 1.636.723 1.635 1.636 1.635m-4.907 5.452a3.27 3.27 0 1 0 0-6.542 3.27 3.27 0 0 0 0 6.542m0 8.722c2.105 0 3.816-1.711 3.816-3.829s-1.711-3.816-3.829-3.816a3.82 3.82 0 0 0-3.816 3.816 3.825 3.825 0 0 0 3.829 3.83M6.542 14.18a6.542 6.542 0 1 0 0-13.084 6.542 6.542 0 1 0 0 13.084"></path></g></svg>
                  </div>
                  <div className={path === '/create' ? "navbar-icon nav-create" : "navbar-icon nav-create none"}>
                  <svg fill="#FFB200" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#606060" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.365 8.729c.9 0 1.635-.735 1.635-1.635s-.735-1.636-1.635-1.636-1.636.735-1.636 1.636.723 1.635 1.636 1.635m-4.907 5.452a3.27 3.27 0 1 0 0-6.542 3.27 3.27 0 0 0 0 6.542m0 8.722c2.105 0 3.816-1.711 3.816-3.829s-1.711-3.816-3.829-3.816a3.82 3.82 0 0 0-3.816 3.816 3.825 3.825 0 0 0 3.829 3.83M6.542 14.18a6.542 6.542 0 1 0 0-13.084 6.542 6.542 0 1 0 0 13.084"></path></g></svg>
                  </div>
                  <div className={path === '/create' ? "navbar-text nav-text-active nav-creates" : "navbar-text nav-text nav-creates"}>Create</div>
                </div>
              </Link>

            <Link href="/snap">
              <div className="navbar-course">
                <div className={path !== '/snap' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z" fill="#606060"></path></g></svg>
                </div>
                <div className={path === '/snap' ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z" fill="#FFB200"></path></g></svg>
                </div>
                <div className={path === '/snap' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Snap</div>
              </div>
            </Link>

            <Link href="/random-snaps">
              <div className="navbar-course">
                <div className={path !== '/random-snaps' ? "navbar-icon" : "navbar-icon none"}>
                <svg fill="#606060" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#606060" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.626 8.878a7.937 7.937 0 0 1 1.71-2.541 7.92 7.92 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.49 2.49 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059-1.19.5-2.26 1.22-3.18 2.139A9.98 9.98 0 0 0 2 12h2c0-1.086.211-2.136.626-3.122zm14.747 6.244c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.973 9.973 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path><path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538c2.502 0 4.538-2.036 4.538-4.538S14.502 7.462 12 7.462z"></path></g></svg>
                </div>
                <div className={path === '/random-snaps' ? "navbar-icon" : "navbar-icon none"}>
                <svg fill="#FFB200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#FFB200" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.626 8.878a7.937 7.937 0 0 1 1.71-2.541 7.92 7.92 0 0 1 2.542-1.71 8.12 8.12 0 0 1 6.13-.041A2.49 2.49 0 0 0 17.5 7C18.886 7 20 5.886 20 4.5S18.886 2 17.5 2c-.689 0-1.312.276-1.763.725-2.431-.973-5.223-.958-7.635.059-1.19.5-2.26 1.22-3.18 2.139A9.98 9.98 0 0 0 2 12h2c0-1.086.211-2.136.626-3.122zm14.747 6.244c-.401.952-.977 1.808-1.71 2.541s-1.589 1.309-2.542 1.71a8.12 8.12 0 0 1-6.13.041A2.488 2.488 0 0 0 6.5 17C5.114 17 4 18.114 4 19.5S5.114 22 6.5 22c.689 0 1.312-.276 1.763-.725A9.973 9.973 0 0 0 12 22a9.983 9.983 0 0 0 9.217-6.102A9.992 9.992 0 0 0 22 12h-2a7.993 7.993 0 0 1-.627 3.122z"></path><path d="M12 7.462c-2.502 0-4.538 2.036-4.538 4.538S9.498 16.538 12 16.538c2.502 0 4.538-2.036 4.538-4.538S14.502 7.462 12 7.462z"></path></g></svg>
                </div>
                <div className={path === '/random-snaps' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Randomizer</div>
              </div>
            </Link>
        </div>
        </div>

        <div className="navbar-footer">
          <div className="navbar-notification" onClick={notificationHandler}>
            <div className={!notificationActive ? "navbar-icon" : "navbar-icon none"}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#606060" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"></path> <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#606060" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#606060" strokeWidth="1.5" strokeMiterlimit="10"></path> </g></svg>
            </div>
            <div className={notificationActive ? "navbar-icon" : "navbar-icon none"}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#FFB200"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#FFB200"></path> </g></svg>
            </div>
            <div className={notificationActive ? "navbar-text nav-text-active nav-notification" : "navbar-text nav-text nav-notification"}>Notification</div>
            <NavbarNotification isActive={notificationActive} onClose={() => setNotificationActive(false)} />
          </div>

          {/* Login/Logout buttons */}
          {!isLoggedIn ? (
            <div className="navbar-login" onClick={handleLoginClick}>
              <div className={!loginActive ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 16.9998C6 17.3511 6 17.5268 6.01567 17.6795C6.14575 18.9473 7.0626 19.9945 8.30206 20.291C8.45134 20.3267 8.6255 20.3499 8.97368 20.3963L15.5656 21.2753C17.442 21.5254 18.3803 21.6505 19.1084 21.361C19.7478 21.1068 20.2803 20.6406 20.6168 20.0405C21 19.3569 21 18.4104 21 16.5174V7.48232C21 5.58928 21 4.64275 20.6168 3.95923C20.2803 3.35911 19.7478 2.89288 19.1084 2.63868C18.3803 2.34914 17.442 2.47423 15.5656 2.72442L8.97368 3.60335C8.62546 3.64978 8.45135 3.67299 8.30206 3.7087C7.0626 4.0052 6.14575 5.05241 6.01567 6.32018C6 6.47288 6 6.64854 6 6.99984M12 7.99984L16 11.9998M16 11.9998L12 15.9998M16 11.9998H3" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={loginActive ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 16.9998C6 17.3511 6 17.5268 6.01567 17.6795C6.14575 18.9473 7.0626 19.9945 8.30206 20.291C8.45134 20.3267 8.6255 20.3499 8.97368 20.3963L15.5656 21.2753C17.442 21.5254 18.3803 21.6505 19.1084 21.361C19.7478 21.1068 20.2803 20.6406 20.6168 20.0405C21 19.3569 21 18.4104 21 16.5174V7.48232C21 5.58928 21 4.64275 20.6168 3.95923C20.2803 3.35911 19.7478 2.89288 19.1084 2.63868C18.3803 2.34914 17.442 2.47423 15.5656 2.72442L8.97368 3.60335C8.62546 3.64978 8.45135 3.67299 8.30206 3.7087C7.0626 4.0052 6.14575 5.05241 6.01567 6.32018C6 6.47288 6 6.64854 6 6.99984M12 7.99984L16 11.9998M16 11.9998L12 15.9998M16 11.9998H3" stroke="#FFB200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={loginActive ? "navbar-text nav-text-active nav-login" : "navbar-text nav-text nav-login"}>Log In</div>
            </div>
          ) : (
            <div className="navbar-logout" onClick={handleLogout}>
              <div className={!logoutActive ? "navbar-icon nav-log" : "navbar-icon none nav-log"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#FFB200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={!logoutActive ? "navbar-icon nav-logt" : "navbar-icon none nav-logt"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#FFB200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className="navbar-text nav-text-active nav-logout nav-log">Log Out</div>
              <div className="navbar-text nav-text-active nav-logout nav-logt">Log Out</div>
            </div>
          )}

          {/* <Link href="/profile"> */}
            <div className='navbar-profile nav-profiles'>
              {!profileActive ? <div className="navbar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#606060"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#606060"></path> </g> </g> </g></svg>
              </div> :
                <div className="navbar-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#FFB200"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#FFB200"></path> </g> </g> </g></svg>
                </div>}
              <div className="navbar-profile-info">
                <div className="navbar-profile-name">{formatName(userName)}</div>
                <div className="navbar-profile-email">{formatEmail(userEmail)}</div>
              </div>
            </div>
          {/* </Link> */}


          {/* <div className='navbar-profile nav-prof' onClick={handleProfileClick}>
            {!showProf ? <div className="navbar-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#606060"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#606060"></path> </g> </g> </g></svg>
            </div> :
              <div className="navbar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#FFB200"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#FFB200"></path> </g> </g> </g></svg>
              </div>}
          </div> */}


          {/* {showProfile && (
            <div className="navbar-profile-dropdown">
              <Link href="/profile">
                <div onClick={handleProfileClick} className={path === '/profile' ? "navbar-profile-dropdown-item nav-active" : "navbar-profile-dropdown-item"}>
                  Profile
                </div>
              </Link>
              {!isLoggedIn ? (
                <div onClick={handleLoginClick} className="navbar-profile-dropdown-item">Log In</div>
              ) : (
                <div onClick={handleLogout} className="navbar-profile-dropdown-item nav-active">Log Out</div>
              )}
            </div>
          )} */}


          {/* Login Modal */}
          {showLogin && (
            <Login
              onClose={handleCloseModal}
              currentPath={path}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {showSuccessNotification && (
            <div className="success-notification">
              <div className="success-content">
                <svg
                  className="success-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="success-message">Successfully Logged In</span>
              </div>
            </div>
          )}

          {showLogoutNotification && (
            <div className="logout-notification">
              <div className="logout-content">
                <svg
                  className="logout-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="logout-message">Successfully Logged Out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar