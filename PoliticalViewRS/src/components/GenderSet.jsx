// GenderSet.js
import React from 'react';
import Card from './Card'; // Reuse your existing Card component

const GenderSet = ({ onSelectGender }) => {
  const genderOptions = ['Male', 'Female', 'Other'];

  return (
    <div className="next-set-container">
      <p className="question-text">Gender</p>
      <div className="card-container">
        {genderOptions.map((option, index) => (
          <Card
            key={index}
            title=""
            content={option}  // Gender option
            className="card-next-set"
            onClick={() => onSelectGender(option)}  // When a gender option is clicked, handle selection
          />
        ))}
      </div>
    </div>
  );
};

export default GenderSet;
