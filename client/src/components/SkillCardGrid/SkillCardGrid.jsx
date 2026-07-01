import React from "react";
import "./SkillCardGrid.css";

export default function SkillCardGrid({ onViewDetails }) {
  // First 6 cards data matching the user's screenshots
  const cardData = [
    {
      id: 1,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      name: "Alex Rivera",
      school: "Stanford University",
      category: "Coding",
      categoryClass: "coding",
      title: "Python for Beginners",
      description: "Learn the fundamentals of Python including data types, loops, and basic automation scripts. Great for non-CS majors!",
      availability: "Available Weekends",
      rating: 4.9,
      reviews: 124
    },
    {
      id: 2,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      name: "Sarah Chen",
      school: "RISD, Providence",
      category: "Design",
      categoryClass: "design",
      title: "UI Design Fundamentals",
      description: "Master Figma and the principles of typography, color theory, and layout for web and mobile interfaces.",
      availability: "Mon - Wed Evenings",
      rating: 4.8,
      reviews: 86
    },
    {
      id: 3,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      name: "Jordan Smith",
      school: "UT Austin",
      category: "Math",
      categoryClass: "math",
      title: "Advanced Calculus Prep",
      description: "Preparing for midterms? I'll help you crack integration, limits, and multi-variable equations with ease.",
      availability: "Flexible Schedule",
      rating: 5.0,
      reviews: 42
    },
    {
      id: 4,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      name: "Elena Rodriguez",
      school: "UC Berkeley",
      category: "Languages",
      categoryClass: "languages",
      title: "Conversational Spanish",
      description: "Practice real-world Spanish conversations. Focus on fluency, slang, and cultural nuances in a relaxed environment.",
      availability: "Weekday Mornings",
      rating: 4.7,
      reviews: 65
    },
    {
      id: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      name: "Liam O'Connor",
      school: "NYU, New York",
      category: "Music",
      categoryClass: "music",
      title: "Acoustic Guitar 101",
      description: "Learn your first chords and basic strumming patterns. Perfect for absolute beginners who just bought their first guitar.",
      availability: "Weekends Only",
      rating: 4.9,
      reviews: 31
    },
    {
      id: 6,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
      name: "Maya Patel",
      school: "LSE, London",
      category: "Exam Prep",
      categoryClass: "examprep",
      title: "GMAT Strategy & Tips",
      description: "I scored 740+ on my first attempt. Let me show you the shortcuts and logical reasoning patterns that really work.",
      availability: "Tuesday / Thursday",
      rating: 4.9,
      reviews: 112
    }
  ];

  return (
    <div className="skill-grid-container">
      <div className="skill-grid-content">
        <div className="skill-cards-grid">
          {cardData.map((card) => (
            <div key={card.id} className="skill-card">
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
                    {card.rating.toFixed(1)}
                  </span>
                  <span style={{ color: "#6b7280" }}>
                    ({card.reviews} reviews)
                  </span>
                </div>
                <button className="skill-card-btn" onClick={onViewDetails}>View Details</button>
              </div>
            </div>
          ))}
        </div>

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
