import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        {/* Left Section: Logo & Navigation Links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" onClick={handleTabClick}>
            CampusConnect
          </Link>
          
          <ul className={`navbar-links ${mobileMenuOpen ? "mobile-active" : ""}`}>
            <li className="navbar-item">
              <Link
                to="/"
                className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
                onClick={handleTabClick}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to="/skills"
                className={`navbar-link ${location.pathname === "/skills" ? "active" : ""}`}
                onClick={handleTabClick}
              >
                Browse Skills
              </Link>
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
