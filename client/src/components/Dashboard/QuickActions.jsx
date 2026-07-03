import React from "react";
import "./QuickActions.css";

export default function QuickActions({ onCreateListing, onBrowseSkills, onIncomingRequests, incomingRequestsCount = 0 }) {
  return (
    <div className="quick-actions-section">
      <h3 className="quick-actions-title">QUICK ACTIONS</h3>
      
      <div className="quick-actions-list">
        {/* Action 1: Create a Listing */}
        <button className="quick-action-btn primary" onClick={onCreateListing}>
          <div className="quick-action-left">
            <span className="quick-action-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </span>
            <span className="quick-action-label">Create a Listing</span>
          </div>
          <span className="quick-action-chevron">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </button>

        {/* Action 2: Browse Skills */}
        <button className="quick-action-btn secondary" onClick={onBrowseSkills}>
          <div className="quick-action-left">
            <span className="quick-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </span>
            <span className="quick-action-label">Browse Skills</span>
          </div>
          <span className="quick-action-chevron">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
        </button>

        {/* Action 3: Incoming Requests */}
        <button className="quick-action-btn secondary" onClick={onIncomingRequests}>
          <div className="quick-action-left">
            <span className="quick-action-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <span className="quick-action-label">Incoming Requests</span>
          </div>
          
          <div className="quick-action-right">
            {incomingRequestsCount > 0 && (
              <span className="quick-action-badge">{incomingRequestsCount}</span>
            )}
            <span className="quick-action-chevron">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
