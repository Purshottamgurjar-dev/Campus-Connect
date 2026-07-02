import React, { useState, useEffect } from "react";
import { submitSkillReview } from "../../services/Api";
import "./ReviewsSection.css";

export default function ReviewsSection({ card, user, onLoginClick }) {
  if (!card) return null;

  const [reviewsList, setReviewsList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Sync state with card
  useEffect(() => {
    setReviewsList(card.reviewsList || []);
  }, [card]);

  // Helper to render star SVGs
  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <span key={idx} className={`review-card-stars ${idx < Math.round(count) ? "active" : "inactive"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill={idx < Math.round(count) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={idx < Math.round(count) ? "0" : "2"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </span>
    ));
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in first to write a review.");
      if (onLoginClick) onLoginClick();
      return;
    }

    if (!newComment.trim()) {
      alert("Please enter a review comment.");
      return;
    }

    setSubmitting(true);
    try {
      const updatedSkill = await submitSkillReview(card._id || card.id, {
        rating: newRating,
        comment: newComment
      });

      // Update local state with the returned skill's reviews
      setReviewsList(updatedSkill.reviewsList);
      
      // Update the card values (mutating in parent or keeping local sync)
      card.reviewsList = updatedSkill.reviewsList;
      card.reviews = updatedSkill.reviews;
      card.rating = updatedSkill.rating;

      // Clear form
      setNewComment("");
      setNewRating(5);
      alert("Review posted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Determine realistic progress widths based on ratings
  const totalReviewsCount = reviewsList.length;
  const count5 = reviewsList.filter(r => Math.round(r.rating) === 5).length;
  const count4 = reviewsList.filter(r => Math.round(r.rating) === 4).length;
  const count3 = reviewsList.filter(r => Math.round(r.rating) <= 3).length;

  const bar5 = totalReviewsCount ? `${(count5 / totalReviewsCount) * 100}%` : "0%";
  const bar4 = totalReviewsCount ? `${(count4 / totalReviewsCount) * 100}%` : "0%";
  const bar3 = totalReviewsCount ? `${(count3 / totalReviewsCount) * 100}%` : "0%";

  return (
    <div className="reviews-section-container">
      {/* Top Header Row */}
      <div className="reviews-header-row">
        <h2 className="reviews-title">Reviews</h2>

        {/* Rating Breakdown Card */}
        <div className="reviews-breakdown-card">
          {/* Average Rating Score */}
          <div className="breakdown-score-col">
            <span className="breakdown-score-num">{(card.rating || 5).toFixed(1)}</span>
            <div className="breakdown-score-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(card.rating || 5) ? "currentColor" : "none"} stroke="currentColor" strokeWidth={i < Math.round(card.rating || 5) ? "0" : "2"}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
            </div>
            <span className="breakdown-score-count">{totalReviewsCount} Reviews</span>
          </div>

          {/* Divider */}
          <div className="breakdown-divider"></div>

          {/* Progress Bars */}
          <div className="breakdown-bars-col">
            {/* 5 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">5</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: bar5 }}></div>
              </div>
            </div>

            {/* 4 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">4</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: bar4 }}></div>
              </div>
            </div>

            {/* 3 Stars */}
            <div className="breakdown-bar-row">
              <span className="breakdown-bar-label">3</span>
              <div className="breakdown-bar-track">
                <div className="breakdown-bar-fill" style={{ width: bar3 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Write Form */}
      <div className="reviews-write-box" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", marginBottom: "30px", textAlign: "left" }}>
        <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Write a Review</h4>
        {user ? (
          <form onSubmit={handleAddReview} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>Rating:</span>
              <select 
                value={newRating} 
                onChange={(e) => setNewRating(Number(e.target.value))}
                style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", cursor: "pointer" }}
              >
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Poor)</option>
                <option value={1}>1 Star (Terrible)</option>
              </select>
            </div>
            <textarea
              placeholder="Share your experience learning this skill with this tutor..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ width: "100%", height: "80px", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none", resize: "none", fontSize: "14px", fontFamily: "inherit" }}
              required
            ></textarea>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ alignSelf: "flex-end", backgroundColor: "#6366f1", color: "white", border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}
            >
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </form>
        ) : (
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Please <span onClick={onLoginClick} style={{ color: "#6366f1", fontWeight: "600", cursor: "pointer", textDecoration: "underline" }}>log in</span> to write a review.
          </p>
        )}
      </div>

      {/* Review Cards Grid */}
      <div className="reviews-cards-grid">
        {reviewsList.map((rev, idx) => (
          <div key={rev._id || rev.id || idx} className="review-card">
            {/* Review Card Header */}
            <div className="review-card-header">
              <div className="review-card-user">
                <div className={`review-card-avatar ${rev.avatarClass || "blue-avatar"}`}>
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
