import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Left Section: Double Logos & Copyright */}
        <div className="footer-left">
          <a href="/" className="footer-logo-group">
            {/* Small Monochrome badge */}
            <div className="footer-small-logo">
              <span className="footer-plus-icon">+</span>
              <span className="footer-small-text">CampusConn</span>
            </div>
            {/* Main brand name */}
            <span className="footer-main-logo">CampusConnect</span>
          </a>
          <p className="footer-copyright">
            &copy; 2024 CampusConnect. All rights reserved.
          </p>
        </div>

        {/* Right Section: Links & Circular Actions Grouped Together */}
        <div className="footer-right">
          <div className="footer-links-group">
            <a href="#terms" className="footer-link">
              Terms
            </a>
            <a href="#privacy" className="footer-link">
              Privacy
            </a>
            <a href="#help" className="footer-link">
              Help
            </a>
          </div>

          <div className="footer-right-actions">
            {/* Share/Connections Icon Button */}
            <button className="footer-icon-btn" aria-label="Share">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </button>

            {/* Mail/Envelope Icon Button */}
            <button className="footer-icon-btn" aria-label="Mail Support">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
