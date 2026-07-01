import React from "react";
import "./Breadcrumbs.css";

export default function Breadcrumbs({ onNavigate }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <nav className="breadcrumbs-container" aria-label="Breadcrumb">
      <ul className="breadcrumbs-list">
        {/* Browse Skills Link */}
        <li className="breadcrumbs-item">
          <a
            href="/"
            onClick={handleHomeClick}
            className="breadcrumbs-link"
          >
            Browse Skills
          </a>
        </li>

        {/* Separator */}
        <li className="breadcrumbs-separator" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </li>

        {/* Category Link */}
        <li className="breadcrumbs-item">
          <a
            href="/"
            onClick={handleHomeClick}
            className="breadcrumbs-link"
          >
            Coding
          </a>
        </li>

        {/* Separator */}
        <li className="breadcrumbs-separator" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </li>

        {/* Current Page */}
        <li className="breadcrumbs-item breadcrumbs-current" aria-current="page">
          React.js Basics
        </li>
      </ul>
    </nav>
  );
}
