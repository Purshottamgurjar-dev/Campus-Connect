import React from "react";
import "./ReviewsSection.css";

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      initials: "JS",
      avatarClass: "blue-avatar",
      name: "Jordan Smith",
      date: "Oct 12, 2024",
      rating: 5,
      comment:
        '"Alex is an incredible teacher. He broke down complex concepts like hooks and useEffect into very simple analogies that made perfect sense."'
    },
    {
      id: 2,
      initials: "CL",
      avatarClass: "purple-avatar",
      name: "Claire Lee",
      date: "Sep 28, 2024",
      rating: 5,
      comment:
        '"The hands-on coding was super helpful. Alex really knows his stuff and is very patient when you run into bugs."'
    }
  ];

  // Helper to render star SVGs
  const renderStars = (count) => {
    return Array.from({ length: count }).map((_, idx) => (
      <span key={idx} className="review-card-stars">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </span>
    ));
  };

  return (
    <div className="reviews-section-container">
      {/* Top Header Row */}
      <div className="reviews-header-row">
        <h2 className="reviews-title">Reviews</h2>

        {/* Rating Breakdown Card */}
        <div className="reviews-breakdown-card">
          {/* Average Rating Score */}
          <div className="breakdown-score-col">
            <span className="breakdown-score-num">4.9</span>
            <div className="breakdown-score-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <span className="breakdown-score-count">124 Reviews</span>
          </div>

          {/* Divider */}
          <div className="breakdown-divider"></div>

          {/* Progress Bars */}
          <div className="breakdown-bars-col">
            {/* 5 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">5</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: "90%" }}></div>
              </div>
            </div>

            {/* 4 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">4</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: "8%" }}></div>
              </div>
            </div>

            {/* 3 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">3</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: "2%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="reviews-cards-grid">
        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            {/* Review Card Header */}
            <div className="review-card-header">
              <div className="review-card-user">
                <div className={`review-card-avatar ${rev.avatarClass}`}>
                  {rev.initials}
                </div>
                <div className="review-card-user-info">
                  <span className="review-card-name">{rev.name}</span>
                  <span className="review-card-date">{rev.date}</span>
                </div>
              </div>
              <div className="review-card-stars-wrapper">
                {renderStars(rev.rating)}
              </div>
            </div>

            {/* Review Comment text */}
            <p className="review-card-comment">{rev.comment}</p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="reviews-load-more-container">
        <button
          className="reviews-load-more-btn"
          onClick={() => console.log("Loading more reviews...")}
        >
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
