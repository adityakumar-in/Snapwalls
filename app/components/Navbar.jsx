"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import "@/app/styles/navbar.css";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const options = ["All", "Mobile", "Desktop"];
  const profileOptions = ["Profile", "Notifications", "Settings", "Logout"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleProfileOptionClick = (option) => {
    // console.log(option);
    setProfileOpen(false);
  };

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

  return (
    <div className="navbar">
      {/* Dropdown */}
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="dropbtn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="navbar-text">{selectedOption}</span>
          <RiArrowDropDownLine className="dropdown-icon" />
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
      <div className="notification">
        <IoNotificationsOutline className="notification-icon" />
      </div>

      {/* Profile Menu */}
      <div className="profile" ref={profileRef}>
        <img
          className="profile-image"
          src="/images/profile-image.jpeg"
          alt="Profile"
          onClick={() => setProfileOpen(!profileOpen)}
        />
        {profileOpen && (
          <div className="profile-menu">
            {profileOptions.map((option, index) => (
              <div
                key={index}
                className="profile-item"
                onClick={() => handleProfileOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
