import React from "react";
import ctaIllustration from "../../assets/cta_illustration.png";
import "./CtaBanner.css";

export default function CtaBanner() {
  return (
    <section className="cta-banner-container">
      <div className="cta-banner-content">
        {/* Left Column: Tagline & Buttons */}
        <div className="cta-banner-left">
          <h2 className="cta-banner-heading">
            Can't find what you're looking for?
          </h2>
          <p className="cta-banner-description">
            Join our community and post a request. Or, share your own skills
            and start earning rewards for helping your peers!
          </p>
          <div className="cta-banner-buttons">
            <button className="cta-btn primary">Become a Tutor</button>
            <button className="cta-btn secondary">Post a Request</button>
          </div>
        </div>

        {/* Right Column: Illustration Image */}
        <div className="cta-banner-right">
          <img
            src={ctaIllustration}
            alt="Students collaborating at a desk"
            className="cta-banner-illustration"
          />
        </div>
      </div>
    </section>
  );
}
