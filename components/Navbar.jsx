"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline, IoNotifications } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaSignOutAlt } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import "@/app/styles/navbar.css";
import { FaCloudUploadAlt, FaUserPlus, FaHeart, FaComment, FaAward, } from 'react-icons/fa';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAls6YNcAlW54zldtQUUYq-Ki7n6uhUWTI",
  authDomain: "snapwalls-wallpaper.firebaseapp.com",
  projectId: "snapwalls-wallpaper",
  storageBucket: "snapwalls-wallpaper.appspot.com",
  messagingSenderId: "305754642684",
  appId: "1:305754642684:web:98fe3d7ca9e0ac8eb6df79",
  measurementId: "G-LXQEEM6577"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Navbar() {
  const currentPath = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("All");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProfileOption, setSelectedProfileOption] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const [isThemesOpen, setIsThemesOpen] = useState(false);

  // const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // const options = ["All", "Mobile", "Desktop"];
  const profileOptions = ["Themes", "Logout"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setProfileOpen(false);
      setSelectedProfileOption(null);
      setNotificationsOpen(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (notificationsOpen) {
      document.body.classList.add('navbar-no-scroll');
    } else {
      document.body.classList.remove('navbar-no-scroll');
    }

    return () => {
      document.body.classList.remove('navbar-no-scroll');
    };
  }, [notificationsOpen]);

  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setDropdownOpen(false);
  // };

  const handleProfileOptionClick = (option) => {
    if (option === "Notifications") {
      setNotificationsOpen((prevState) => !prevState);
      setSelectedProfileOption((prevOption) =>
        prevOption === "Notifications" ? null : "Notifications"
      );
    } else if (option === "Themes") {
      setIsThemesOpen(true);
      setSelectedProfileOption("Themes");
    } else {
      setSelectedProfileOption((prevOption) =>
        prevOption === option ? null : option
      );
      setNotificationsOpen(false);
    }
    setProfileOpen(false);
  };

  const handleNotificationClick = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  // Add this effect to handle the animation end and hide the element
  useEffect(() => {
    const notificationElement = document.querySelector('.navbar-notifications-content');
    if (notificationElement) {
      const handleAnimationEnd = () => {
        if (!notificationsOpen) {
          notificationElement.style.display = 'none';
        }
      };

      notificationElement.addEventListener('animationend', handleAnimationEnd);
      return () => {
        notificationElement.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [notificationsOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        // (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (profileRef.current && !profileRef.current.contains(event.target))
      ) {
        // setDropdownOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileOpen]); // Removed dropdownOpen from the dependency array

  const handleProfileImageClick = () => {
    setSelectedProfileOption(null);
    setNotificationsOpen(false);
    setProfileOpen(!profileOpen);
    // setDropdownOpen(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setProfileOpen(false);
    setSelectedProfileOption(null);
    setNotificationsOpen(false);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutNotification(true);
      setSelectedProfileOption(null);
      setTimeout(() => {
        setShowLogoutNotification(false);
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleClose = () => {
    setIsThemesOpen(false);
    setSelectedProfileOption(null);
  };

  return (
    <div className="navbar-nav">
      <div className="nav-site-logo">
        <Link href="/" className="parent-logo">
          <img className="navbar-site-logo" src="site-logo.png" alt="" />
          <span className="nav-site-title"><span className="nav-site-title-right">Snap</span>walls</span>
        </Link>
      </div>
      {/* Commented out navbar-dropdown
      <div className="navbar-dropdown" ref={dropdownRef}>
        <button
          className="navbar-dropbtn"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setProfileOpen(false);
            setSelectedProfileOption(null);
          }}
        >
          <span className="navbar-text">{selectedOption}</span>
          <RiArrowDropDownLine
            className="navbar-dropdown-icon"
            style={{ marginLeft: "0px" }}
          />
        </button>
        {dropdownOpen && (
          <div className="navbar-dropdown-menu">
            {options.map((option, index) => (
              <div
                key={index}
                className="navbar-dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      */}
      {/* <form className="navbar-search-container">
        <div className="navbar-search-icon-container">
          <BiSearch className="navbar-search-icon" />
        </div>
        <input
          type="text"
          className="navbar-search-bar"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form> */}
      {isLoggedIn ? (
        <>
          <div className="flex">
            <div className="navbar-notification" onClick={handleNotificationClick}>
              {notificationsOpen ? (
                <IoNotifications className="navbar-notification-icon" />
              ) : (
                <IoNotificationsOutline className="navbar-notification-icon" />
              )}
            </div>
            <div className="navbar-profile" ref={profileRef}>
              <img
                className="navbar-profile-image"
                src="/images/profile-image.jpeg"
                alt="Profile"
                onClick={handleProfileImageClick}
              />
              {profileOpen && (
                <div className="navbar-profile-menu">
                  {profileOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`navbar-profile-item ${option === "Notifications" ? "navbar-small-screen-only" : ""
                        }`}
                      onClick={() => {
                        if (option === "Logout") {
                          handleLogout();
                        } else {
                          handleProfileOptionClick(option);
                        }
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex">
          <div className="navbar-login">
            <button className="navbar-login-button" onClick={handleLoginClick}>
              Log In
            </button>
          </div>
          <div className="navbar-signup">
            <button className="navbar-signup-button" onClick={handleSignupClick}>
              Sign Up
            </button>
          </div>
        </div>
      )}
      {(notificationsOpen || selectedProfileOption === "Notifications") && (
        <div className={`navbar-notifications-content ${notificationsOpen ? 'show' : 'hide'}`}>
          <div className="navbar-notification-header">
            <h2>Notifications</h2>
            <RxCross2
              className="navbar-close-icon"
              onClick={handleNotificationClick}
            />
          </div>
          <div className="notification-list-container">
            <ul className="notification-list">
              <li className="notification-item">
                <div className="notification-icon">
                  <FaCloudUploadAlt />
                </div>
                <div className="notification-content">
                  <div className="notification-title">New Upload</div>
                  <div className="notification-message">Your wallpaper "Mountain Vista" has been uploaded.</div>
                  <div className="notification-time">Now</div>
                </div>
              </li>
              <li className="notification-item">
                <div className="notification-icon">
                  <FaUserPlus />
                </div>
                <div className="notification-content">
                  <div className="notification-title">New follower</div>
                  <div className="notification-message">John Doe started following you.</div>
                  <div className="notification-time">2 hours ago</div>
                </div>
              </li>
              <li className="notification-item">
                <div className="notification-icon">
                  <FaHeart />
                </div>
                <div className="notification-content">
                  <div className="notification-title">Your post was liked</div>
                  <div className="notification-message">Your wallpaper "Sunset Beach" received 50 likes.</div>
                  <div className="notification-time">Yesterday</div>
                </div>
              </li>
              <li className="notification-item">
                <div className="notification-icon">
                  <FaComment />
                </div>
                <div className="notification-content">
                  <div className="notification-title">New comment</div>
                  <div className="notification-message">Alice commented on your wallpaper "Mountain Vista".</div>
                  <div className="notification-time">3 days ago</div>
                </div>
              </li>
              <li className="notification-item">
                <div className="notification-icon">
                  <FaAward />
                </div>
                <div className="notification-content">
                  <div className="notification-title">Achievement Unlocked</div>
                  <div className="notification-message">You've reached 1000 followers! Congratulations!</div>
                  <div className="notification-time">1 week ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isThemesOpen && (
        <div className="navbar-themes-content">
          <div className="navbar-themes-header">
            <h2>Themes</h2>
            <button className="navbar-close-button" onClick={handleClose}>
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="navbar-close-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
          <p className="navbar-themes-description">Choose a theme to customize your experience:</p>
          <div className="navbar-themes-options">
            <button className="navbar-theme-option navbar-theme-light">
              <svg className="navbar-theme-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              Light
            </button>
            <button className="navbar-theme-option navbar-theme-dark">
              <svg className="navbar-theme-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              Dark
            </button>
            <button className="navbar-theme-option navbar-theme-system">
              <svg className="navbar-theme-icon" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              System
            </button>
          </div>
        </div>
      )}
      {showSignup && <Signup onClose={handleCloseSignup} currentPath={currentPath} />}
      {showLogin && <Login onClose={handleCloseLogin} currentPath={currentPath} />}
      {selectedProfileOption === "Logout" && (
        <div className="navbar-logout-content">
          <h2>Logout</h2>
          <RxCross2
            className="navbar-close-icon"
            onClick={handleProfileOptionClick}
          />
          <p>Are you sure you want to logout?</p>
          <div className="navbar-confirm">
            <button className="navbar-logout-button" onClick={handleLogout}>
              Logout
            </button>
            <button className="navbar-cancel-button" onClick={handleProfileOptionClick}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showLogoutNotification && (
        <div className="logout-notification">
          <div className="logout-content">
            <FaSignOutAlt className="logout-icon" />
            <div className="logout-message">
              <h2>Successfully Logged Out</h2>
              <p>You have been securely logged out.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;