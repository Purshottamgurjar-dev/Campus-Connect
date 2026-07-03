import React, { useState } from "react";
import "./DashboardHeader.css";

export default function DashboardHeader({ profileName = "purshottam", activeItem = "Overview", onProfileClick }) {
  const [searchVal, setSearchVal] = useState("");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchVal);
  };

  const getPlaceholderText = () => {
    if (activeItem === "My Requests") return "Search my requests...";
    if (activeItem === "My Skills") return "Search my skills or sessions...";
    return "Search for skills, tutors, or sessions...";
  };

  return (
    <header className="dashboard-header-container">
      {/* Left Section: Global Search Input */}
      <form className="dashboard-header-search-wrapper" onSubmit={handleSearchSubmit}>
        <span className="dashboard-header-search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          type="text"
          className="dashboard-header-search-input"
          placeholder={getPlaceholderText()}
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </form>

      {/* Right Section: Actions & Identity Badge */}
      <div className="dashboard-header-actions">
        {/* Notification Bell */}
        <button
          className="dashboard-header-icon-btn"
          aria-label="Notifications"
          onClick={() => setHasUnreadNotifications(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          {hasUnreadNotifications && <span className="dashboard-header-bell-badge"></span>}
        </button>

        {/* Settings Gear */}
        <button className="dashboard-header-icon-btn" aria-label="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>

        {/* Profile Identity Badge (Clickable dynamic link to Profile view) */}
        <div
          className="dashboard-header-profile"
          onClick={onProfileClick}
          style={{ cursor: "pointer" }}
          title="View Profile"
        >
          <div className="dashboard-header-user-info">
            <span className="dashboard-header-username">{profileName}</span>
            <span className="dashboard-header-major">Senior Student</span>
          </div>
          <div className="dashboard-header-avatar">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
              alt={profileName}
              className="dashboard-header-avatar-img"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
