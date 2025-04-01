// AgeSet.js
import React from 'react';
import Card from './Card'; // Reuse your existing Card component

const AgeSet = ({ onSelectAge }) => {
  const ageOptions = ['18-24', '25-34', '35-44', '45-54', '55+'];

  return (
    <div className="next-set-container">
      <p className="question-text">Age Group</p>
      <div className="card-container">
        {ageOptions.map((option, index) => (
          <Card
            key={index}
            title=""
            content={option}  // Age group option
            className="card-next-set"
            onClick={() => onSelectAge(option)}  // When an age is clicked, load the next set (Gender)
          />
        ))}
      </div>
    </div>
  );
};

export default AgeSet;
