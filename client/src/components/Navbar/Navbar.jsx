import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

export default function Navbar2({ onNavigate, currentPage, user, onLoginClick, onGetStartedClick, onLogout }) {
  const [activeTab, setActiveTab] = useState("Browse Skills");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  const profileRef = useRef(null);
  const isLoggedIn = !!user;

  // Sync navbar active tab state with page state changes
  
  // Close dropdown when clicking outside

  

  const handleGetStartedClick = () => {
    if (onGetStartedClick) {
      onGetStartedClick();
    } else if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <div className="navbar2-container">
      <div className="navbar2-content">
        {/* Left Section: Logos & Navigation Links */}
        <div className="navbar2-left">
          
            {/* Main CampusConnect logo */}
            <span className="navbar2-main-logo">CampusConnect</span>
          
          
        
        </div>

        {/* Right Section: Actions (Conditional based on login state) */}
        <div className="navbar2-right">
          {isLoggedIn ? (
            /* Logged In View */
            <>
              {/* Notification Bell Icon */}
              <button 
                className="navbar2-icon-btn" 
                aria-label="Notifications"
                onClick={() => setHasNotifications(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {hasNotifications && <span className="navbar2-notification-badge"></span>}
              </button>

              {/* User Profile Avatar with Dropdown */}
              <div style={{ position: "relative" }} ref={profileRef}>
                <button 
                  className={`navbar2-profile-trigger ${profileDropdownOpen ? "active" : ""}`}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-label="User Profile menu"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" 
                    alt="User Profile" 
                    className="navbar2-avatar-img"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="navbar2-dropdown">
                    <div style={{ padding: "10px 16px", fontSize: "13px", fontWeight: "600", color: "#6b7280" }}>
                      {user.name}
                    </div>
                    <div className="navbar2-dropdown-divider"></div>
                    <a href="#profile" className="navbar2-dropdown-item" onClick={() => { setProfileDropdownOpen(false); onNavigate("dashboard"); }}>
                      My Profile
                    </a>
                    <a href="#settings" className="navbar2-dropdown-item" onClick={() => { setProfileDropdownOpen(false); onNavigate("dashboard"); }}>
                      Settings
                    </a>
                    <div className="navbar2-dropdown-divider"></div>
                    <div 
                      className="navbar2-dropdown-item" 
                      onClick={() => { onLogout(); setProfileDropdownOpen(false); }}
                      style={{ color: "#ef4444" }}
                    >
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Logged Out View */
            <>
              <button className="navbar2-login-btn" onClick={onLoginClick}>Log In</button>
              <button className="navbar2-get-started-btn" onClick={handleGetStartedClick}>Get Started</button>
            </>
          )}

          {/* Mobile menu toggle */}
          <button 
            className="navbar2-mobile-toggle"
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
