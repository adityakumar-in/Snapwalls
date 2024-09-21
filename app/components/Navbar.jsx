"use client";
import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import "@/app/styles/navbar.css"; // Make sure the path is correct

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");

  const dropdownRef = useRef(null);

  const options = ["All", "Popular", "New", "Trending"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="navbar">
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
      <div className="notification">
        <IoNotificationsOutline className="notification-icon" />
      </div>
    </div>
  );
}

export default Navbar;
