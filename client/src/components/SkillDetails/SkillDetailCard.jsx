import React from "react";
import "./SkillDetailCard.css";

export default function SkillDetailCard() {
  const handleShareClick = () => {
    // Demo action
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } else {
      alert("Sharing action triggered!");
    }
  };

  return (
    <div className="detail-card-container">
      {/* Top Header Section */}
      <div className="detail-card-header">
        <span className="detail-card-category">Coding</span>
        <button className="detail-card-share-btn" onClick={handleShareClick}>
          <span className="detail-card-share-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </span>
          Share Listing
        </button>
      </div>

      {/* Course Title */}
      <h1 className="detail-card-title">Learn React.js from Scratch</h1>

      {/* Tutor Profile Row */}
      <div className="detail-card-tutor">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
          alt="Alex Rivera"
          className="detail-card-avatar"
        />
        <div className="detail-card-tutor-info">
          <span className="detail-card-tutor-name">Alex Rivera</span>
          <div className="detail-card-rating">
            <span className="detail-card-star">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <span className="detail-card-rating-val">4.9</span>
            <span>(124 reviews)</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="detail-card-divider" />

      {/* Description Paragraph */}
      <p className="detail-card-description">
        A comprehensive introduction to React.js for beginners. We'll cover components, props, state, and hooks through hands-on coding exercises. By the end of our sessions, you'll be able to build a functional interactive web application.
      </p>

      {/* Footer Meta Details */}
      <div className="detail-card-footer">
        <div className="detail-card-meta-item">
          <span className="detail-card-meta-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </span>
          <span>Weekends Only</span>
        </div>

        <div className="detail-card-meta-item">
          <span className="detail-card-meta-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span>Listed Oct 24, 2024</span>
        </div>
      </div>
    </div>
  );
}
