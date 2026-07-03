import React from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import SkillDetailCard from "./SkillDetailCard";
import TutorProfileCard from "./TutorProfileCard";
import ReviewsSection from "./ReviewsSection";
import BookingSidebar from "./BookingSidebar";
import "./SkillDetailsPage.css";

import { skillsData } from "../../data/skillsData";

export default function SkillDetailsPage({ onNavigate, selectedCard, user, onLoginClick }) {
  const card = selectedCard || skillsData[0];

  return (
    <div className="details-page-container">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs onNavigate={onNavigate} category={card.category} title={card.title} />

      {/* Main Grid Content */}
      <div className="details-page-content">
        
        {/* Left Column: Skill Information & Reviews */}
        <div className="details-left-column">
          {/* Component 1: Course Info Banner */}
          <SkillDetailCard card={card} />

          {/* Component 2: Tutor Profile Card */}
          <TutorProfileCard card={card} />

          {/* Component 3: Reviews & Ratings section */}
          <ReviewsSection card={card} user={user} onLoginClick={onLoginClick} />
        </div>

        {/* Right Column: Request booking form */}
        <div className="details-right-column">
          {/* Component 4: Session Request Sidebar Form */}
          <BookingSidebar card={card} user={user} onLoginClick={onLoginClick} />
        </div>

      </div>
    </div>
  );
}
