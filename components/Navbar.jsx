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

  // const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // const options = ["All", "Mobile", "Desktop"];
  const profileOptions = ["Notifications", "Themes", "Logout"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

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
    setSelectedProfileOption((prevOption) =>
      prevOption === "Notifications" ? null : "Notifications"
    );
    setProfileOpen(false);
  };

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

  return (
    <div className="navbar-nav">
      <div className="nav-site-logo">
        <Link href="/">
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
        </>
      ) : (
        <div className="flex">
          <div className="navbar-signup">
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
        <div className="navbar-notifications-content">
          <div className="navbar-notification-header">
            <h2>Notifications</h2>
            <RxCross2
              className="navbar-close-icon"
              onClick={handleNotificationClick}
            />
          </div>
          <p>Check your recent notifications here.</p>
        </div>
      )}
      {selectedProfileOption === "Themes" && (
        <div className="navbar-themes-content">
          <h2>Themes</h2>
          <RxCross2
            className="navbar-close-icon"
            onClick={handleProfileOptionClick}
          />
          <p>Change your themes here.</p>
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
              <span>Logout</span>
            </button>
            <button
              className="navbar-cancel-button"
              onClick={handleProfileOptionClick}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
      {showLogoutNotification && (
        <div className="navbar-logout-notification">
          <FaSignOutAlt className="navbar-logout-icon" />
          <div className="navbar-logout-message">
            <h2>Successfully Logged Out</h2>
            <p>You have been securely logged out.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;