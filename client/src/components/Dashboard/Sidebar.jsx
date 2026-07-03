import React from "react";
import "./Sidebar.css";

export default function Sidebar({ activeItem = "Overview", onItemClick, isOpen = false }) {
  const menuItems = [
    {
      name: "Overview",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      )
    },
    {
      name: "My Skills",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M19 11v1a3 3 0 0 1-3 3h-1"></path>
          <circle cx="19" cy="8" r="1"></circle>
        </svg>
      )
    },
    {
      name: "My Requests",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <polyline points="9 14 12 11 15 14"></polyline>
        </svg>
      )
    },
    {
      name: "Incoming Requests",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="17" x2="12" y2="11"></line>
          <polyline points="9 14 12 17 15 14"></polyline>
        </svg>
      )
    },
    {
      name: "My Sessions",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      name: "Profile",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  const handleLogout = () => {
    alert("Logging out and returning to landing page...");
    if (onItemClick) {
      onItemClick("Logout");
    }
  };

  return (
    <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand logo details */}
      <div className="sidebar-brand">
        <span className="sidebar-logo-text">CampusConnect</span>
        <span className="sidebar-logo-sub">Academic Peer Network</span>
      </div>

      {/* Menu links list */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`sidebar-menu-item ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => onItemClick && onItemClick(item.name)}
          >
            <span className="sidebar-menu-icon">{item.icon}</span>
            <span className="sidebar-menu-text">{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Logout button */}
      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <span className="sidebar-menu-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </span>
          <span className="sidebar-menu-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}
