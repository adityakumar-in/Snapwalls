'use client'
import { React, useState, useEffect, useRef } from 'react'
import '/app/styles/sidebar.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Login from './Login'
import { signOut } from 'firebase/auth'
import { ref, set, remove, get, onValue } from 'firebase/database'
import { db, auth } from '/components/firebase.config' // Make sure this path is correct
import gsap from 'gsap'

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
  const [showProfile, setShowProfile] = useState(false)
  const [showProf, setShowProf] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const closeRef = useRef(null);
  const siteRef = useRef(null);

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
          setUserEmail(user.email);
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
        setUserEmail('john.doe@example.com');
        setIsCreated(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const notificationHandler = () => {
    setNotificationActive(!notificationActive)
  }

  const loginHandler = () => {
    setLoginActive(!loginActive)
  }

  const siteHandler = () => {
    if (siteActive) {
      setIsClosing(true);
      // Wait for animation to complete before updating siteActive
      setTimeout(() => {
        setSiteActive(false);
        setIsClosing(false);
      }, 500); // Match animation duration
    } else {
      setSiteActive(true);
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
      setProfileActive(true)
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
    return email.length > 12 ? email.substring(0, 12) + '...' : email;
  };

  return (
    <div className="navbar-wrapper">
      <div className={`navbar-container ${siteActive ? 'navbar-container-active' : ''} ${isClosing ? 'navbar-container-closing' : ''}`} ref={siteRef}>


        <div className="navbar-header">
          <div className="navbar-sitename" onClick={siteHandler}>
            <div className={`navbar-icon nav-sitename ${siteActive ? 'flip-icon' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.49997 12.4L5 17.7999" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.49997 12.4L5 7" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></path>
                  <line x1="18" y1="18" x2="10" y2="18" stroke="#606060" strokeWidth="1.224" strokeLinecap="round" strokeLinejoin="round"></line>
                </g>
              </svg>
            </div>
            <Link href="/">
              <div className="nav-name nav-name-active">Snap<span className='nav-name-bold nav-name-bold-active'>walls</span></div>
            </Link>
          </div>

          <div className="navbar-items">
            <Link href="/home">
              <div className="navbar-home">
                <div className={path !== '/home' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 15L12 18" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
                <div className={path === '/home' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2.33537 7.87495C1.79491 9.00229 1.98463 10.3208 2.36407 12.9579L2.64284 14.8952C3.13025 18.2827 3.37396 19.9764 4.54903 20.9882C5.72409 22 7.44737 22 10.8939 22H13.1061C16.5526 22 18.2759 22 19.451 20.9882C20.626 19.9764 20.8697 18.2827 21.3572 14.8952L21.6359 12.9579C22.0154 10.3208 22.2051 9.00229 21.6646 7.87495C21.1242 6.7476 19.9738 6.06234 17.6731 4.69181L16.2882 3.86687C14.199 2.62229 13.1543 2 12 2C10.8457 2 9.80104 2.62229 7.71175 3.86687L6.32691 4.69181C4.02619 6.06234 2.87583 6.7476 2.33537 7.87495ZM8.2501 17.9998C8.2501 17.5856 8.58589 17.2498 9.0001 17.2498H15.0001C15.4143 17.2498 15.7501 17.5856 15.7501 17.9998C15.7501 18.414 15.4143 18.7498 15.0001 18.7498H9.0001C8.58589 18.7498 8.2501 18.414 8.2501 17.9998Z" fill="#df2e38"></path> </g></svg>
                </div>
                <div className={path === '/home' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Home</div>
              </div>
            </Link>

            <Link href="/search">
              <div className="navbar-search">
                <div className={path !== '/search' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 20L15.8033 15.8033C15.8033 15.8033 14 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 11.0137 17.9484 11.5153 17.85 12" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className={path === '/search' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 20L15.8033 15.8033C15.8033 15.8033 14 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 11.0137 17.9484 11.5153 17.85 12" stroke="#df2e38" strokeWidth="1.752" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </div>
                <div className={path === '/search' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Search</div>
              </div>
            </Link>

            {!isCreated ? (
              <Link href="/create">
                <div className="navbar-create">
                  <div className={path !== '/create' ? "navbar-icon nav-create" : "navbar-icon nav-create none"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.1109 13.5754C17.5014 13.9659 18.1346 13.9659 18.5251 13.5754L21 11.1005C23.1479 8.95265 23.1479 5.47025 21 3.32236C18.8521 1.17448 15.3697 1.17448 13.2218 3.32236L10.7469 5.79724C10.3564 6.18776 10.3564 6.82093 10.7469 7.21145C11.1375 7.60197 11.7706 7.60197 12.1612 7.21145L14.636 4.73658C16.0029 3.36974 18.2189 3.36974 19.5858 4.73658C20.9526 6.10341 20.9526 8.31949 19.5858 9.68632L17.1109 12.1612C16.7204 12.5517 16.7204 13.1849 17.1109 13.5754Z" fill="#606060"></path> <path d="M5.79719 10.747C6.18771 10.3565 6.82088 10.3565 7.2114 10.747C7.60193 11.1375 7.60193 11.7707 7.2114 12.1612L4.73653 14.6361C3.36969 16.0029 3.36969 18.219 4.73653 19.5858C6.10336 20.9527 8.31944 20.9527 9.68628 19.5858L12.1612 17.1109C12.5517 16.7204 13.1848 16.7204 13.5754 17.1109C13.9659 17.5015 13.9659 18.1346 13.5754 18.5252L11.1005 21C8.95261 23.1479 5.4702 23.1479 3.32232 21C1.17443 18.8521 1.17443 15.3697 3.32232 13.2219L5.79719 10.747Z" fill="#606060"></path> <path d="M8.97917 15.3432C8.58865 14.9527 8.58865 14.3195 8.97917 13.929L13.9289 8.97922C14.3194 8.58869 14.9526 8.58869 15.3431 8.97922C15.7337 9.36974 15.7337 10.0029 15.3431 10.3934L10.3934 15.3432C10.0029 15.7337 9.3697 15.7337 8.97917 15.3432Z" fill="#606060"></path> </g></svg>
                  </div>
                  <div className={path !== '/create' ? "navbar-icon nav-create nav-cr" : "navbar-icon nav-create none nav-cr"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.1109 13.5754C17.5014 13.9659 18.1346 13.9659 18.5251 13.5754L21 11.1005C23.1479 8.95265 23.1479 5.47025 21 3.32236C18.8521 1.17448 15.3697 1.17448 13.2218 3.32236L10.7469 5.79724C10.3564 6.18776 10.3564 6.82093 10.7469 7.21145C11.1375 7.60197 11.7706 7.60197 12.1612 7.21145L14.636 4.73658C16.0029 3.36974 18.2189 3.36974 19.5858 4.73658C20.9526 6.10341 20.9526 8.31949 19.5858 9.68632L17.1109 12.1612C16.7204 12.5517 16.7204 13.1849 17.1109 13.5754Z" fill="#f2f2f2"></path> <path d="M5.79719 10.747C6.18771 10.3565 6.82088 10.3565 7.2114 10.747C7.60193 11.1375 7.60193 11.7707 7.2114 12.1612L4.73653 14.6361C3.36969 16.0029 3.36969 18.219 4.73653 19.5858C6.10336 20.9527 8.31944 20.9527 9.68628 19.5858L12.1612 17.1109C12.5517 16.7204 13.1848 16.7204 13.5754 17.1109C13.9659 17.5015 13.9659 18.1346 13.5754 18.5252L11.1005 21C8.95261 23.1479 5.4702 23.1479 3.32232 21C1.17443 18.8521 1.17443 15.3697 3.32232 13.2219L5.79719 10.747Z" fill="#f2f2f2"></path> <path d="M8.97917 15.3432C8.58865 14.9527 8.58865 14.3195 8.97917 13.929L13.9289 8.97922C14.3194 8.58869 14.9526 8.58869 15.3431 8.97922C15.7337 9.36974 15.7337 10.0029 15.3431 10.3934L10.3934 15.3432C10.0029 15.7337 9.3697 15.7337 8.97917 15.3432Z" fill="#f2f2f2"></path> </g></svg>
                  </div>
                  <div className={path === '/create' ? "navbar-icon nav-create" : "navbar-icon nav-create none"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#df2e38" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.1109 13.5754C17.5014 13.9659 18.1346 13.9659 18.5251 13.5754L21 11.1005C23.1479 8.95265 23.1479 5.47025 21 3.32236C18.8521 1.17448 15.3697 1.17448 13.2218 3.32236L10.7469 5.79724C10.3564 6.18776 10.3564 6.82093 10.7469 7.21145C11.1375 7.60197 11.7706 7.60197 12.1612 7.21145L14.636 4.73658C16.0029 3.36974 18.2189 3.36974 19.5858 4.73658C20.9526 6.10341 20.9526 8.31949 19.5858 9.68632L17.1109 12.1612C16.7204 12.5517 16.7204 13.1849 17.1109 13.5754Z" fill="#df2e38"></path> <path d="M5.79719 10.747C6.18771 10.3565 6.82088 10.3565 7.2114 10.747C7.60193 11.1375 7.60193 11.7707 7.2114 12.1612L4.73653 14.6361C3.36969 16.0029 3.36969 18.219 4.73653 19.5858C6.10336 20.9527 8.31944 20.9527 9.68628 19.5858L12.1612 17.1109C12.5517 16.7204 13.1848 16.7204 13.5754 17.1109C13.9659 17.5015 13.9659 18.1346 13.5754 18.5252L11.1005 21C8.95261 23.1479 5.4702 23.1479 3.32232 21C1.17443 18.8521 1.17443 15.3697 3.32232 13.2219L5.79719 10.747Z" fill="#df2e38"></path> <path d="M8.97917 15.3432C8.58865 14.9527 8.58865 14.3195 8.97917 13.929L13.9289 8.97922C14.3194 8.58869 14.9526 8.58869 15.3431 8.97922C15.7337 9.36974 15.7337 10.0029 15.3431 10.3934L10.3934 15.3432C10.0029 15.7337 9.3697 15.7337 8.97917 15.3432Z" fill="#df2e38"></path> </g></svg>
                  </div>
                  <div className={path === '/create' ? "navbar-text nav-text-active nav-creates" : "navbar-text nav-text nav-creates"}>Create</div>
                </div>
              </Link>
            ) : (
              <Link href="/activity">
                <div className="navbar-activity">
                  <div className={path !== '/activity' ? "navbar-icon nav-activity" : "navbar-icon nav-activity none"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#606060"></path> </g></svg>
                  </div>
                  <div className={path !== '/activity' ? "navbar-icon nav-activity nav-act" : "navbar-icon nav-activity none nav-act"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#f2f2f2"></path> </g></svg>
                  </div>
                  <div className={path === '/activity' ? "navbar-icon nav-activity" : "navbar-icon nav-activity none"}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10.9965 4.00001C11.4368 3.99846 11.8263 4.28508 11.9558 4.70591L15.1231 14.9997L18.0715 7.62861C18.1964 7.31651 18.4697 7.08801 18.7989 7.02042C19.1282 6.95284 19.4694 7.0552 19.7071 7.29289L22.7071 10.2929C23.0976 10.6834 23.0976 11.3166 22.7071 11.7071C22.3166 12.0976 21.6834 12.0976 21.2929 11.7071L19.3652 9.77946L15.9285 18.3714C15.771 18.765 15.3826 19.0165 14.959 18.9992C14.5355 18.9818 14.1689 18.6992 14.0442 18.2941L11.0121 8.43973L8.95782 15.2873C8.84938 15.6488 8.54667 15.9185 8.17511 15.9845C7.80355 16.0506 7.42643 15.9019 7.2 15.6L5 12.6667L2.8 15.6C2.46863 16.0418 1.84183 16.1314 1.4 15.8C0.95817 15.4686 0.868627 14.8418 1.2 14.4L4.2 10.4C4.38885 10.1482 4.68524 10 5 10C5.31475 10 5.61114 10.1482 5.8 10.4L7.6114 12.8152L10.0422 4.71265C10.1687 4.29092 10.5562 4.00156 10.9965 4.00001Z" fill="#df2e38"></path> </g></svg>
                  </div>
                  <div className={path === '/activity' ? "navbar-text nav-text-active nav-activities" : "navbar-text nav-text nav-activities"}>Activity</div>
                </div>
              </Link>
            )}

            <Link href="/course">
              <div className="navbar-course">
                <div className={path !== '/course' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7" stroke="#606060" strokeWidth="1.5"></path> <path d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5" stroke="#606060" strokeWidth="1.5"></path> <path d="M14.5812 13.6159C15.1396 13.9621 15.1396 14.8582 14.5812 15.2044L11.2096 17.2945C10.6669 17.6309 10 17.1931 10 16.5003L10 12.32C10 11.6273 10.6669 11.1894 11.2096 11.5258L14.5812 13.6159Z" stroke="#606060" strokeWidth="1.5"></path> <path d="M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z" stroke="#606060" strokeWidth="1.5"></path> </g></svg>
                </div>
                <div className={path === '/course' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.50989 2.00001H15.49C15.7225 1.99995 15.9007 1.99991 16.0565 2.01515C17.1643 2.12352 18.0711 2.78958 18.4556 3.68678H5.54428C5.92879 2.78958 6.83555 2.12352 7.94337 2.01515C8.09917 1.99991 8.27741 1.99995 8.50989 2.00001Z" fill="#df2e38"></path> <path d="M6.31052 4.72312C4.91989 4.72312 3.77963 5.56287 3.3991 6.67691C3.39117 6.70013 3.38356 6.72348 3.37629 6.74693C3.77444 6.62636 4.18881 6.54759 4.60827 6.49382C5.68865 6.35531 7.05399 6.35538 8.64002 6.35547H15.5321C17.1181 6.35538 18.4835 6.35531 19.5639 6.49382C19.9833 6.54759 20.3977 6.62636 20.7958 6.74693C20.7886 6.72348 20.781 6.70013 20.773 6.67691C20.3925 5.56287 19.2522 4.72312 17.8616 4.72312H6.31052Z" fill="#df2e38"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.3276 7.54204H8.67239C5.29758 7.54204 3.61017 7.54204 2.66232 8.52887C1.71447 9.5157 1.93748 11.0403 2.38351 14.0896L2.80648 16.9811C3.15626 19.3724 3.33115 20.568 4.22834 21.284C5.12553 22 6.4488 22 9.09534 22H14.9046C17.5512 22 18.8745 22 19.7717 21.284C20.6689 20.568 20.8437 19.3724 21.1935 16.9811L21.6165 14.0896C22.0625 11.0404 22.2855 9.51569 21.3377 8.52887C20.3898 7.54204 18.7024 7.54204 15.3276 7.54204ZM14.5812 15.7942C15.1396 15.4481 15.1396 14.5519 14.5812 14.2058L11.2096 12.1156C10.6669 11.7792 10 12.2171 10 12.9099V17.0901C10 17.7829 10.6669 18.2208 11.2096 17.8844L14.5812 15.7942Z" fill="#df2e38"></path> </g></svg>
                </div>
                <div className={path === '/course' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Course</div>
              </div>
            </Link>



            {isCreated && <Link href="/roadmap">
              <div className="navbar-roadmap">
                <div className={path !== '/roadmap' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 7.23858 2.23858 5 5 5H19C21.7614 5 24 7.23858 24 10V14C24 16.7614 21.7614 19 19 19H5C2.23858 19 0 16.7614 0 14V10ZM5 7C3.34315 7 2 8.34315 2 10V14C2 15.6569 3.34315 17 5 17H19C20.6569 17 22 15.6569 22 14V10C22 8.34315 20.6569 7 19 7H5ZM10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V11ZM6 9C4.89543 9 4 9.89543 4 11V13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13V11C8 9.89543 7.10457 9 6 9Z" fill="#606060"></path> </g></svg>
                </div>
                <div className={path === '/roadmap' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5 5C2.23858 5 0 7.23858 0 10V14C0 16.7614 2.23858 19 5 19H19C21.7614 19 24 16.7614 24 14V10C24 7.23858 21.7614 5 19 5H5ZM2 10C2 8.34315 3.34315 7 5 7H19C20.6569 7 22 8.34315 22 10V14C22 15.6569 20.6569 17 19 17H5C3.34315 17 2 15.6569 2 14V10ZM18 9C16.8954 9 16 9.89543 16 11V13C16 14.1046 16.8954 15 18 15C19.1046 15 20 14.1046 20 13V11C20 9.89543 19.1046 9 18 9ZM10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11V13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13V11ZM6 9C4.89543 9 4 9.89543 4 11V13C4 14.1046 4.89543 15 6 15C7.10457 15 8 14.1046 8 13V11C8 9.89543 7.10457 9 6 9Z" fill="#df2e38"></path> </g></svg>
                </div>
                <div className={path === '/roadmap' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Roadmap</div>
              </div>
            </Link>}

            <Link href="/discussion">
              <div className="navbar-discussion">
                <div className={path !== '/discussion' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10.5H16" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M8 14H13.5" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#606060" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
                <div className={path === '/discussion' ? "navbar-icon" : "navbar-icon none"}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" fill="#df2e38"></path> </g></svg>
                </div>
                <div className={path === '/discussion' ? "navbar-text nav-text-active" : "navbar-text nav-text"}>Discussion</div>
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
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#df2e38"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#df2e38"></path> </g></svg>
            </div>
            <div className={notificationActive ? "navbar-text nav-text-active nav-notification" : "navbar-text nav-text nav-notification"}>Notification</div>
          </div>

          {/* Login/Logout buttons */}
          {!isLoggedIn ? (
            <div className="navbar-login" onClick={handleLoginClick}>
              <div className={!loginActive ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 16.9998C6 17.3511 6 17.5268 6.01567 17.6795C6.14575 18.9473 7.0626 19.9945 8.30206 20.291C8.45134 20.3267 8.6255 20.3499 8.97368 20.3963L15.5656 21.2753C17.442 21.5254 18.3803 21.6505 19.1084 21.361C19.7478 21.1068 20.2803 20.6406 20.6168 20.0405C21 19.3569 21 18.4104 21 16.5174V7.48232C21 5.58928 21 4.64275 20.6168 3.95923C20.2803 3.35911 19.7478 2.89288 19.1084 2.63868C18.3803 2.34914 17.442 2.47423 15.5656 2.72442L8.97368 3.60335C8.62546 3.64978 8.45135 3.67299 8.30206 3.7087C7.0626 4.0052 6.14575 5.05241 6.01567 6.32018C6 6.47288 6 6.64854 6 6.99984M12 7.99984L16 11.9998M16 11.9998L12 15.9998M16 11.9998H3" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={loginActive ? "navbar-icon" : "navbar-icon none"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 16.9998C6 17.3511 6 17.5268 6.01567 17.6795C6.14575 18.9473 7.0626 19.9945 8.30206 20.291C8.45134 20.3267 8.6255 20.3499 8.97368 20.3963L15.5656 21.2753C17.442 21.5254 18.3803 21.6505 19.1084 21.361C19.7478 21.1068 20.2803 20.6406 20.6168 20.0405C21 19.3569 21 18.4104 21 16.5174V7.48232C21 5.58928 21 4.64275 20.6168 3.95923C20.2803 3.35911 19.7478 2.89288 19.1084 2.63868C18.3803 2.34914 17.442 2.47423 15.5656 2.72442L8.97368 3.60335C8.62546 3.64978 8.45135 3.67299 8.30206 3.7087C7.0626 4.0052 6.14575 5.05241 6.01567 6.32018C6 6.47288 6 6.64854 6 6.99984M12 7.99984L16 11.9998M16 11.9998L12 15.9998M16 11.9998H3" stroke="#df2e38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={loginActive ? "navbar-text nav-text-active nav-login" : "navbar-text nav-text nav-login"}>Log In</div>
            </div>
          ) : (
            <div className="navbar-logout" onClick={handleLogout}>
              <div className={!logoutActive ? "navbar-icon nav-log" : "navbar-icon none nav-log"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#df2e38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className={!logoutActive ? "navbar-icon nav-logt" : "navbar-icon none nav-logt"}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7" stroke="#606060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <div className="navbar-text nav-text-active nav-logout nav-log">Log Out</div>
              <div className="navbar-text nav-text-active nav-logout nav-logt">Log Out</div>
            </div>
          )}

          <Link href="/profile">
            <div className='navbar-profile nav-profiles'>
              {!profileActive ? <div className="navbar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#606060"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#606060"></path> </g> </g> </g></svg>
              </div> :
                <div className="navbar-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#df2e38"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#df2e38"></path> </g> </g> </g></svg>
                </div>}
              <div className="navbar-profile-info">
                <div className="navbar-profile-name">John Doe</div>
                <div className="navbar-profile-email">{formatEmail(userEmail)}</div>
              </div>
            </div>
          </Link>


          <div className='navbar-profile nav-prof' onClick={handleProfileClick}>
            {!showProf ? <div className="navbar-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#606060"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#606060"></path> </g> </g> </g></svg>
            </div> :
              <div className="navbar-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=fill"> <g id="profile"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#df2e38"></path> <path id="rec (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#df2e38"></path> </g> </g> </g></svg>
              </div>}
            <div className="navbar-profile-info">
              <div className="navbar-profile-name">John Doe</div>
              <div className="navbar-profile-email">{formatEmail(userEmail)}</div>
            </div>
          </div>


          {showProfile && (
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
          )}


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