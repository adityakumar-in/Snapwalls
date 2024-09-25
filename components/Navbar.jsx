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
    <div className="navbar">
      {/* Dropdown */}
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="dropbtn"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setProfileOpen(false); // Close profile if dropdown is opened
            setSelectedProfileOption(null); // Close profile content if dropdown opens
          }}
        >
          <span className="navbar-text">{selectedOption}</span>
          <RiArrowDropDownLine
            className="dropdown-icon"
            style={{ marginLeft: "0px" }}
          />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Search */}
      <form className="search-container" action="#">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BiSearch className="search-icon" />
      </form>
      {/* Notifications */}
      {/* <div className="notification">
        {selectedProfileOption === "Notifications" ? (
          <IoNotifications className="notification-icon" />
        ) : (
          <IoNotificationsOutline className="notification-icon" />
        )}
      </div> */}{" "}
      {/* DO NOT DELETE THIS OR TOUCH THIS ADITYA BHAI PLEASE */}
      <div className="notification" onClick={handleNotificationClick}>
        {notificationsOpen ? (
          <IoNotifications className="notification-icon" />
        ) : (
          <IoNotificationsOutline className="notification-icon" />
        )}
      </div>
      {/* Profile Menu */}
      <div className="profile" ref={profileRef}>
        <img
          className="profile-image"
          src="/images/profile-image.jpeg"
          alt="Profile"
          onClick={handleProfileImageClick}
        />
        {profileOpen && (
          <div className="profile-menu">
            {profileOptions.map((option, index) => (
              <div
                key={index}
                className={`profile-item ${
                  option === "Notifications" ? "small-screen-only" : ""
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
        <div className="notifications-content">
          <div className="notification-header">
            <h2>Notifications</h2>
            <RxCross2
              className="close-icon"
              onClick={handleNotificationClick}
            />
          </div>
          <p>Check your recent notifications here.</p>
        </div>
      )}
      {selectedProfileOption === "Themes" && (
        <div className="themes-content">
          <h2>Themes</h2>
          <RxCross2 className="close-icon" onClick={handleProfileOptionClick} />
          <p>Change your themes here.</p>
        </div>
      )}
      {selectedProfileOption === "Logout" && (
        <div className="logout-content">
          <h2>Logout</h2>
          <RxCross2 className="close-icon" onClick={handleProfileOptionClick} />
          <p>Are you sure you want to logout?</p>
          <div className="confirm">
            <button
              className="cancel-button"
              onClick={handleProfileOptionClick}
            >
              Cancel
            </button>
            <button className="logout-button">Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
