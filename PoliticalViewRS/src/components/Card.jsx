import React from 'react';

function Card({ title, content, className, onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Card;
