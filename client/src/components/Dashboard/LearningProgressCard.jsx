import React from "react";
import "./LearningProgressCard.css";

export default function LearningProgressCard() {
  const items = [
    {
      id: 1,
      title: "Python for Data Science",
      percentage: 65,
      nextTopic: "Next: Pandas DataFrame Operations",
      colorClass: "blue"
    },
    {
      id: 2,
      title: "UI Design Fundamentals",
      percentage: 40,
      nextTopic: "Next: Typography & Hierarchies",
      colorClass: "purple"
    }
  ];

  return (
    <div className="learning-progress-card">
      <h3 className="learning-progress-title">Learning Progress</h3>
      
      <div className="learning-progress-grid">
        {items.map((item) => (
          <div key={item.id} className="learning-progress-item">
            {/* Header info */}
            <div className="learning-progress-item-header">
              <span className="learning-progress-item-name">{item.title}</span>
              <span className={`learning-progress-item-percentage ${item.colorClass}`}>
                {item.percentage}%
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="learning-progress-track">
              <div 
                className={`learning-progress-fill ${item.colorClass}`} 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            
            {/* Footer subtext */}
            <span className="learning-progress-next">{item.nextTopic}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
