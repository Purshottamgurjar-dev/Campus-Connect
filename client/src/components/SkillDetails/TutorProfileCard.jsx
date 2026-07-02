import React from "react";
import "./TutorProfileCard.css";

export default function TutorProfileCard({ card }) {
  if (!card) return null;

  const teachesSkills = card.tutorTeaches || [];

  const handleProfileClick = () => {
    alert(`Navigating to ${card.name}'s full profile page...`);
  };

  return (
    <div className="tutor-profile-card">
      {/* Profile Photo */}
      <div className="tutor-profile-photo-wrapper">
        <img
          src={card.tutorAvatar}
          alt={`${card.name} Portrait`}
          className="tutor-profile-photo"
        />
      </div>

      {/* Tutor Information Details */}
      <div className="tutor-profile-details">
        {/* Name, School, Rating bar */}
        <div className="tutor-profile-header">
          <div className="tutor-profile-title-group">
            <span className="tutor-profile-name">{card.name}</span>
            <span className="tutor-profile-school">{card.school}</span>
          </div>

          <div className="tutor-rating-pill">
            <span className="tutor-rating-pill-star">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <span className="tutor-rating-pill-val">{card.rating.toFixed(1)}</span>
            <span style={{ color: "#6b7280" }}>Rating</span>
          </div>
        </div>

        {/* Short Bio description */}
        <p className="tutor-profile-bio">{card.tutorBio}</p>

        {/* Teaches Skills Section */}
        <div className="tutor-teaches-section">
          <span className="tutor-teaches-label">Teaches</span>
          <div className="tutor-teaches-tags">
            {teachesSkills.map((skill) => (
              <span key={skill} className="tutor-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Profile Action */}
        <button className="tutor-profile-btn" onClick={handleProfileClick}>
          View Profile
        </button>
      </div>
    </div>
  );
}
