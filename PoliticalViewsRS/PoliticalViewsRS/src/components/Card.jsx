import React from 'react';
import './CardLayout.css';

function Card({ title, content, className }) { // Add className prop
  return (
    <div className={`card ${className}`}> {/* Apply className */}
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

function CardLayout() {
  return (
    <div className="card-container">
      <Card title="Card 1" content="This is the content of Card 1. It can be any text or component." className="card-blue" />
      <Card title="Card 2" content="This is the content of Card 2. It can also be any text or component." className="card-green" />
    </div>
  );
}

export default CardLayout;