import React, { useState, useEffect } from "react";
import { fetchSkills } from "../../services/Api";
import "./SkillCardGrid.css";

export default function SkillCardGrid({ selectedCategory = "All", selectedSort = "Most Recent", onViewDetails }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSkills = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchSkills(selectedCategory);
        setSkills(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Could not load skills. Please make sure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    getSkills();
  }, [selectedCategory]);

  // Apply sorting client-side
  const getSortedSkills = () => {
    const sorted = [...skills];
    switch (selectedSort) {
      case "Popularity":
        return sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case "Rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "Title (A-Z)":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "Most Recent":
      default:
        // Sort by backend timestamp if available
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const displayedSkills = getSortedSkills();

  if (loading) {
    return (
      <div className="skill-grid-container" style={{ padding: "80px 0", textAlign: "center", color: "#6366f1", fontWeight: "600" }}>
        Loading skills matching your criteria...
      </div>
    );
  }

  if (error) {
    return (
      <div className="skill-grid-container" style={{ padding: "80px 0", textAlign: "center", color: "#ef4444", fontWeight: "600" }}>
        {error}
      </div>
    );
  }

  return (
    <div className="skill-grid-container">
      <div className="skill-grid-content">
        {displayedSkills.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280", fontSize: "16px" }}>
            No skill listings found in this category. Be the first to list one!
          </div>
        ) : (
          <div className="skill-cards-grid">
            {displayedSkills.map((card) => (
              <div key={card.id || card._id} className="skill-card">
                {/* Card Header (User Avatar, Name, School & Category Tag) */}
                <div className="skill-card-header">
                  <div className="skill-card-user">
                    <img
                      src={card.avatar}
                      alt={card.name}
                      className="skill-card-avatar"
                    />
                    <div className="skill-card-user-info">
                      <span className="skill-card-name">{card.name}</span>
                      <span className="skill-card-school">{card.school}</span>
                    </div>
                  </div>
                  <span className={`skill-card-tag ${card.categoryClass}`}>
                    {card.category}
                  </span>
                </div>

                {/* Card Body (Title & Description) */}
                <div className="skill-card-body">
                  <h3 className="skill-card-title">{card.title}</h3>
                  <p className="skill-card-description">{card.description}</p>
                </div>

                {/* Card Metadata (Calendar / Availability) */}
                <div className="skill-card-meta">
                  <span className="skill-card-meta-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </span>
                  <span>{card.availability}</span>
                </div>

                {/* Card Footer (Rating & Details Button) */}
                <div className="skill-card-footer">
                  <div className="skill-card-rating">
                    <span className="skill-card-rating-star">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </span>
                    <span className="skill-card-rating-score">
                      {(card.rating || 5).toFixed(1)}
                    </span>
                    <span style={{ color: "#6b7280" }}>
                      ({card.reviews || 0} reviews)
                    </span>
                  </div>
                  <button className="skill-card-btn" onClick={() => onViewDetails(card)}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Skills Button */}
        <div className="load-more-container">
          <button className="load-more-btn" onClick={() => console.log("Loading more skills...")}>
            Load More Skills
            <span className="load-more-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
