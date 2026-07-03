import React from "react";
import "./UpcomingSessionsCard.css";

export default function UpcomingSessionsCard({ sessions = [] }) {
  // Format the date/time string or return defaults
  const upcomingSessions = sessions.filter(s => s.status === "Confirmed").slice(0, 3);

  return (
    <div className="upcoming-sessions-card-container">
      {/* Card Header Row */}
      <div className="upcoming-sessions-header">
        <h3 className="upcoming-sessions-title">Upcoming Sessions</h3>
      </div>

      {/* Divider */}
      <hr className="upcoming-sessions-divider" />

      {/* Sessions Rows list */}
      <div className="upcoming-sessions-list">
        {upcomingSessions.length === 0 ? (
          <div style={{ padding: "20px 0", color: "#6b7280", fontSize: "14px", textAlign: "center" }}>
            No upcoming sessions confirmed for this week.
          </div>
        ) : (
          upcomingSessions.map((session) => {
            const tutorName = session.tutorId?.name || "Tutor";
            const tutorAvatar = session.skillId?.tutorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150";
            return (
              <div key={session._id} className="upcoming-session-row">
                {/* Column 1: Avatar & Info */}
                <div className="upcoming-session-col-left">
                  <div className="upcoming-session-avatar-wrapper">
                    <img
                      src={tutorAvatar}
                      alt={session.subject}
                      className="upcoming-session-avatar"
                    />
                    <span className="upcoming-session-status-dot"></span>
                  </div>
                  <div className="upcoming-session-info">
                    <span className="upcoming-session-subject">{session.subject}</span>
                    <span className="upcoming-session-tutor">with {tutorName}</span>
                  </div>
                </div>

                {/* Column 2: Date & Scheduled Hours */}
                <div className="upcoming-session-col-center">
                  <span className="upcoming-session-date">{new Date(session.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="upcoming-session-time">{session.time}</span>
                </div>

                {/* Column 3: Status Badge */}
                <div className="upcoming-session-col-right">
                  <span className="upcoming-session-badge confirmed">
                    Confirmed
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
