import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SkillDetailCard from "./SkillDetailCard";
import TutorProfileCard from "./TutorProfileCard";
import ReviewsSection from "./ReviewsSection";
import BookingSidebar from "./BookingSidebar";
import "./SkillDetailsPage.css";

export default function SkillDetailsPage({ onNavigate }) {
  return (
    <div className="details-page-container">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs onNavigate={onNavigate} />

      {/* Main Grid Content */}
      <div className="details-page-content">
        
        {/* Left Column: Skill Information & Reviews */}
        <div className="details-left-column">
          {/* Component 1: Course Info Banner */}
          <SkillDetailCard />

          {/* Component 2: Tutor Profile Card */}
          <TutorProfileCard />

          {/* Component 3: Reviews & Ratings section */}
          <ReviewsSection />
        </div>

        {/* Right Column: Request booking form */}
        <div className="details-right-column">
          {/* Component 4: Session Request Sidebar Form */}
          <BookingSidebar />
        </div>

      </div>
    </div>
  );
}
