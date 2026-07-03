import React, { useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for skill:", searchQuery);
      // Integrate with backend search endpoint here
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* Main Header Tagline */}
        <h1 className="hero-heading">
          Find a skill. Meet a peer. Start learning.
        </h1>

        {/* Supporting Description Subtitle */}
        <p className="hero-description">
          Discover students who can help you learn something new. Connect
          with tutors right on campus or online.
        </p>

        {/* Pill Search Box Container */}
        <form onSubmit={handleSearchSubmit} className="hero-search-wrapper">
          <div className="hero-search-left">
            {/* Search Icon SVG */}
            <span className="hero-search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search coding, design, English, maths..."
              className="hero-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="hero-search-btn">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
