import React from "react";
import "./TutorProfileCard.css";

export default function TutorProfileCard() {
  const teachesSkills = ["React", "TypeScript", "Tailwind CSS"];

  const handleProfileClick = () => {
    alert("Navigating to Alex Rivera's full profile page...");
  };

  return (
    <div className="tutor-profile-card">
      {/* Profile Photo */}
      <div className="tutor-profile-photo-wrapper">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
          alt="Alex Rivera Portrait"
          className="tutor-profile-photo"
        />
      </div>

      {/* Tutor Information Details */}
      <div className="tutor-profile-details">
        {/* Name, School, Rating bar */}
        <div className="tutor-profile-header">
          <div className="tutor-profile-title-group">
            <span className="tutor-profile-name">Alex Rivera</span>
            <span className="tutor-profile-school">Stanford University</span>
          </div>

          <div className="tutor-rating-pill">
            <span className="tutor-rating-pill-star">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <span className="tutor-rating-pill-val">4.9</span>
            <span style={{ color: "#6b7280" }}>Rating</span>
          </div>
        </div>

        {/* Short Bio description */}
        <p className="tutor-profile-bio">
          CS Senior with a passion for web technologies and peer mentorship.
          I've helped over 100 students master modern JavaScript frameworks.
        </p>

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
