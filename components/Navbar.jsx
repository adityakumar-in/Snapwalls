"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import "@/app/styles/navbar.css";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedProfileOption, setSelectedProfileOption] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const options = ["All", "Mobile", "Desktop"];
  const profileOptions = ["Notifications", "Themes", "Logout"];

  // Handle Option Clicks for Dropdown
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  // Handle Profile Option Clicks (like Profile, Settings, Logout)
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

  // Close Dropdowns and Profile on Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) ||
        (profileRef.current && !profileRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen, profileOpen]);

  const handleProfileImageClick = () => {
    setSelectedProfileOption(null); //This toggles the profile menu when the profile image is clicked
    setNotificationsOpen(false); //This toggles the notifications content when the notification is clicked
    setProfileOpen(!profileOpen);
    setDropdownOpen(false);
  };

  return (
    <div className="navbar-nav">
      {/* Dropdown */}
      <div className="navbar-dropdown" ref={dropdownRef}>
        <button
          className="navbar-dropbtn"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setProfileOpen(false); // Close profile if dropdown is opened
            setSelectedProfileOption(null); // Close profile content if dropdown opens
          }}
        >
          <span className="navbar-text">{selectedOption}</span>
          <RiArrowDropDownLine className="navbar-dropdown-icon" style={{ marginLeft: "0px" }} />
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
      {/* Search */}
      <form className="navbar-search-container" action="#">
        <input
          className="navbar-search-bar"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BiSearch className="navbar-search-icon" />
      </form>
      {/* Notifications */}
      {/* <div className="navbar-notification">
        {selectedProfileOption === "Notifications" ? (
          <IoNotifications className="navbar-notification-icon" />
        ) : (
          <IoNotificationsOutline className="navbar-notification-icon" />
        )}
      </div> */}

      {/* DO NOT DELETE THIS OR TOUCH THIS ADITYA BHAI PLEASE */}
      <div className="navbar-notification" onClick={handleNotificationClick}>
        {notificationsOpen ? (
          <IoNotifications className="navbar-notification-icon" />
        ) : (
          <IoNotificationsOutline className="navbar-notification-icon" />
        )}
      </div>

      {/* Profile Menu */}
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
                className={`navbar-profile-item ${
                  option === "Notifications" ? "navbar-small-screen-only" : ""
                }`}
                onClick={() => handleProfileOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Profile Option Content */}
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
          <RxCross2 className="navbar-close-icon" onClick={handleProfileOptionClick} />
          <p>Change your themes here.</p>
        </div>
      )}
      {selectedProfileOption === "Logout" && (
        <div className="navbar-logout-content">
          <h2>Logout</h2>
          <RxCross2 className="navbar-close-icon" onClick={handleProfileOptionClick} />
          <p>Are you sure you want to logout?</p>
          <div className="navbar-confirm">
            <button
              className="navbar-cancel-button"
              onClick={handleProfileOptionClick}
            >
              Cancel
            </button>
            <button className="navbar-logout-button">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
