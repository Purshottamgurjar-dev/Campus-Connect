import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {/* Left Section: Logo & Navigation Links */}
        <div className="navbar-left">
          <a href="/" className="navbar-logo" onClick={() => handleTabClick("Home")}>
            CampusConnect
          </a>
          
          <ul className={`navbar-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
            <li className="navbar-item">
              <a
                href="#home"
                className={`navbar-link ${activeTab === "Home" ? "active" : ""}`}
                onClick={() => handleTabClick("Home")}
              >
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#skills"
                className={`navbar-link ${activeTab === "Browse Skills" ? "active" : ""}`}
                onClick={() => handleTabClick("Browse Skills")}
              >
                Browse Skills
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Buttons */}
        <div className="navbar-right">
          <button className="navbar-login-btn">Log In</button>
          <button className="navbar-get-started-btn">Get Started</button>
          
          {/* Mobile menu toggle */}
          <button 
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: mobileMenuOpen ? '0' : '1' }}></span>
            <span style={{ transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </div>
    </div>
  );
}
