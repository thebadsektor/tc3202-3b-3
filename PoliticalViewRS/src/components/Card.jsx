import React from "react";

function Card({ title, content, className, onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  );
}

export default Card;
