import React, { useState } from "react";
import { requestSession } from "../../services/Api";
import "./BookingSidebar.css";

export default function BookingSidebar({ card, user, onLoginClick }) {
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const tutorFirstName = card ? card.name.split(" ")[0] : "Alex";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert("Please log in first to request a session.");
      if (onLoginClick) onLoginClick();
      return;
    }

    if (!preferredDate || !preferredTime) {
      alert("Please select a preferred date and time.");
      return;
    }

    setSubmitting(true);
    try {
      await requestSession({
        skillId: card._id || card.id,
        date: preferredDate,
        time: preferredTime,
        message: message || ""
      });

      alert(`Request Sent Successfully!\nDate: ${preferredDate}\nTime: ${preferredTime}\nThe teacher will respond to your request shortly.`);
      
      // Clear form fields
      setPreferredDate("");
      setPreferredTime("");
      setMessage("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-sidebar-card">
      <h3 className="booking-sidebar-title">Request a Session</h3>

      <form className="booking-form" onSubmit={handleSubmit}>
        {/* Preferred Date Input */}
        <div className="booking-form-group">
          <label htmlFor="booking-date" className="booking-form-label">
            Preferred Date
          </label>
          <div className="booking-input-wrapper">
            <span className="booking-input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <input
              id="booking-date"
              type="date"
              className="booking-field"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Preferred Time Input */}
        <div className="booking-form-group">
          <label htmlFor="booking-time" className="booking-form-label">
            Preferred Time
          </label>
          <div className="booking-input-wrapper">
            <span className="booking-input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <select
              id="booking-time"
              className="booking-field select-field"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a time
              </option>
              <option value="Morning (8:00 AM - 12:00 PM)">
                Morning (8:00 AM - 12:00 PM)
              </option>
              <option value="Afternoon (12:00 PM - 4:00 PM)">
                Afternoon (12:00 PM - 4:00 PM)
              </option>
              <option value="Evening (4:00 PM - 8:00 PM)">
                Evening (4:00 PM - 8:00 PM)
              </option>
            </select>
            <span className="booking-chevron-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>

        {/* Message to Teacher Input */}
        <div className="booking-form-group">
          <label htmlFor="booking-message" className="booking-form-label">
            Message to Teacher
          </label>
          <textarea
            id="booking-message"
            className="booking-field textarea-field"
            placeholder={`Tell ${tutorFirstName} about your current skill level or specific goals...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Send Request Button */}
        <button type="submit" className="booking-submit-btn" disabled={submitting}>
          {submitting ? "Sending..." : "Send Request"}
        </button>
      </form>

      {/* Availability Info box */}
      <div className="booking-info-box">
        <span className="booking-info-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </span>
        <p className="booking-info-text">
          The teacher will accept or decline your request based on their current
          availability.
        </p>
      </div>
    </div>
  );
}
