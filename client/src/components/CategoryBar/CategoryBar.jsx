import React, { useState, useEffect, useRef } from "react";
import "./CategoryBar.css";

export default function CategoryBar({ onCategoryChange, onSortChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Most Recent");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const categories = ["All", "Coding", "Math", "Design", "Languages", "Music"];
  const sortOptions = ["Most Recent", "Popularity", "Rating", "Title (A-Z)"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleSortClick = (option) => {
    setSelectedSort(option);
    setSortDropdownOpen(false);
    if (onSortChange) {
      onSortChange(option);
    }
  };

  return (
    <div className="category-bar-container">
      <div className="category-bar-content">
        {/* Left Section: Categories Label and Filter Pills */}
        <div className="category-bar-left">
          <span className="category-label">Categories:</span>
          <div className="category-pills">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-pill ${
                  selectedCategory === category ? "active" : "inactive"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Sort dropdown */}
        <div className="category-bar-right" ref={dropdownRef}>
          <span className="sort-label">Sort by:</span>
          <button
            className={`sort-trigger-btn ${sortDropdownOpen ? "active" : ""}`}
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            aria-expanded={sortDropdownOpen}
          >
            {selectedSort}
            <span className="sort-chevron-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          {sortDropdownOpen && (
            <div className="sort-dropdown-menu">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  className={`sort-dropdown-item ${
                    selectedSort === option ? "selected" : ""
                  }`}
                  onClick={() => handleSortClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
