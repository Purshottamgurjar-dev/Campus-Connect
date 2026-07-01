import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Dean posted a new notice regarding final exams schedule.",
      time: "5m ago",
      unread: true,
      category: "academic"
    },
    {
      id: 2,
      text: "Your post 'Best spots to study on campus?' received 12 new replies.",
      time: "2h ago",
      unread: true,
      category: "social"
    },
    {
      id: 3,
      text: "Tech Club: Hackathon registrations are now open!",
      time: "5h ago",
      unread: false,
      category: "event"
    },
    {
      id: 4,
      text: "Lost & Found: Someone found keys near the cafeteria library.",
      time: "1d ago",
      unread: false,
      category: "marketplace"
    }
  ]);

  const navRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Unread notifications count
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Handle scroll event to add background shadow/smaller height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false);
    setMobileMenuOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, unread: false }))
    );
  };

  const handleNotificationClick = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add custom search integration logic here
  };

  return (
    <div className="navbar-container">
      <header className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`} ref={navRef}>
        <nav className="navbar-main">
          {/* Logo Section */}
          <a href="#home" className="nav-logo-link" onClick={() => setActiveTab("Home")}>
            <div className="logo-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <span className="logo-text">CampusConnect</span>
          </a>

          {/* Navigation Links */}
          <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <li className="nav-item">
              <a href="#feed" className={`nav-link ${activeTab === "Home" ? "active" : ""}`} onClick={() => { setActiveTab("Home"); setMobileMenuOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Feed
              </a>
            </li>
            <li className="nav-item">
              <a href="#events" className={`nav-link ${activeTab === "Events" ? "active" : ""}`} onClick={() => { setActiveTab("Events"); setMobileMenuOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Events
              </a>
            </li>
            <li className="nav-item">
              <a href="#groups" className={`nav-link ${activeTab === "Groups" ? "active" : ""}`} onClick={() => { setActiveTab("Groups"); setMobileMenuOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Clubs
              </a>
            </li>
            <li className="nav-item">
              <a href="#marketplace" className={`nav-link ${activeTab === "Marketplace" ? "active" : ""}`} onClick={() => { setActiveTab("Marketplace"); setMobileMenuOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Market
              </a>
            </li>
            <li className="nav-item">
              <a href="#forums" className={`nav-link ${activeTab === "Forums" ? "active" : ""}`} onClick={() => { setActiveTab("Forums"); setMobileMenuOpen(false); }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px'}}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Forums
              </a>
            </li>
          </ul>

          {/* Search, Notifications & Profile Action buttons */}
          <div className="nav-actions">
            {/* Search Bar (Hidden on smaller screens, shown inside nav menu or toggleable) */}
            <form onSubmit={handleSearchSubmit} className="search-container">
              <input
                type="text"
                placeholder="Search CampusConnect..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </form>

            {/* Notifications Dropdown Toggle */}
            <div className="notification-container" ref={notifRef}>
              <button
                className={`action-btn ${notificationsOpen ? "active" : ""}`}
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>

              {/* Notifications Dropdown Panel */}
              <div className={`dropdown-menu ${notificationsOpen ? "active" : ""}`}>
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={markAllAsRead}>
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`notification-item ${notif.unread ? "unread" : ""}`}
                        onClick={() => handleNotificationClick(notif.id)}
                      >
                        {notif.unread && <div className="notification-dot"></div>}
                        <div className="notification-content">
                          <p className="notification-text">{notif.text}</p>
                          <span className="notification-time">{notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="dropdown-footer">
                  <a href="#notifications" className="view-all-link" onClick={() => setNotificationsOpen(false)}>
                    View all notifications
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="profile-container" ref={profileRef}>
              <button
                className={`profile-trigger ${profileOpen ? "active" : ""}`}
                onClick={toggleProfile}
                aria-label="User profile"
              >
                <div className="user-avatar">
                  JD
                </div>
              </button>

              {/* Profile Dropdown Panel */}
              <div className={`dropdown-menu profile-dropdown ${profileOpen ? "active" : ""}`}>
                <div className="profile-info">
                  <span className="profile-name">John Doe</span>
                  <span className="profile-email">john.doe@campus.edu</span>
                </div>
                <a href="#profile" className="dropdown-item" onClick={() => setProfileOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  My Profile
                </a>
                <a href="#settings" className="dropdown-item" onClick={() => setProfileOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                  Account Settings
                </a>
                <a href="#posts" className="dropdown-item" onClick={() => setProfileOpen(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  My Posts
                </a>
                <div className="dropdown-item logout" onClick={() => { setProfileOpen(false); console.log("Logging out..."); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </div>
              </div>
            </div>

            {/* Mobile Hamburger toggle button */}
            <button
              className={`mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
