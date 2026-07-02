import React from "react";
import "./StatsRow.css";

export default function StatsRow({ listedSkillsCount = 0, pendingRequestsCount = 0, upcomingSessionsCount = 0, averageRating = 5.0 }) {
  const stats = [
    {
      id: 1,
      label: "My Skill Listings",
      value: listedSkillsCount.toString(),
      suffix: "active",
      suffixClass: "",
      iconClass: "listings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="17" y2="9"></line>
          <line x1="9" y1="13" x2="17" y2="13"></line>
          <line x1="9" y1="17" x2="17" y2="17"></line>
          <circle cx="6" cy="9" r="1" fill="currentColor"></circle>
          <circle cx="6" cy="13" r="1" fill="currentColor"></circle>
          <circle cx="6" cy="17" r="1" fill="currentColor"></circle>
        </svg>
      )
    },
    {
      id: 2,
      label: "Pending Requests",
      value: pendingRequestsCount.toString(),
      suffix: "new",
      suffixClass: pendingRequestsCount > 0 ? "new-badge" : "", // Purple color in image
      iconClass: "pending",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <circle cx="12" cy="14" r="4"></circle>
          <polyline points="12 12 12 14 13.5 14"></polyline>
        </svg>
      )
    },
    {
      id: 3,
      label: "Upcoming Sessions",
      value: upcomingSessionsCount.toString(),
      suffix: "this week",
      suffixClass: "",
      iconClass: "sessions",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <polyline points="9 16 11 18 15 14"></polyline>
        </svg>
      )
    },
    {
      id: 4,
      label: "Average Rating",
      value: averageRating.toFixed(1),
      suffix: "rating",
      suffixClass: "",
      iconClass: "rating",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    }
  ];

  return (
    <div className="dashboard-stats-grid">
      {stats.map((stat) => (
        <div key={stat.id} className="stat-card">
          {/* Card Icon Wrapper */}
          <div className={`stat-icon-wrapper ${stat.iconClass}`}>
            {stat.icon}
          </div>

          {/* Card Text Content */}
          <div className="stat-info">
            <span className="stat-label">{stat.label}</span>
            <div className="stat-value-group">
              <span className="stat-value-num">{stat.value}</span>
              <span className={`stat-value-suffix ${stat.suffixClass}`}>
                {stat.suffix}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
