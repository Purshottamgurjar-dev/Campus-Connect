import React from "react";
import "./RecentActivityCard.css";

export default function RecentActivityCard() {
  const activities = [
    {
      id: 1,
      type: "accept",
      text: (
        <>
          <strong>Alex Rivera</strong> accepted your session request.
        </>
      ),
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "review",
      text: (
        <>
          New review from <strong>Jordan Smith</strong>.
        </>
      ),
      time: "Yesterday"
    }
  ];

  return (
    <div className="recent-activity-card">
      <h3 className="recent-activity-title">Recent Activity</h3>
      
      <div className="recent-activity-timeline">
        {activities.map((activity, index) => (
          <div key={activity.id} className="timeline-item">
            {/* Left line & icon indicator column */}
            <div className="timeline-indicator-col">
              <div className={`timeline-icon-wrapper ${activity.type}`}>
                {activity.type === "accept" ? (
                  /* Checked Circle Icon */
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  /* Star Icon */
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                )}
              </div>
              {index < activities.length - 1 && <div className="timeline-line"></div>}
            </div>

            {/* Right text details column */}
            <div className="timeline-content-col">
              <span className="timeline-text">{activity.text}</span>
              <span className="timeline-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
