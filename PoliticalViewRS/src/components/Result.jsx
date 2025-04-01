import React from 'react';
import './css/Result.css';

function Result({ predictedValues, userAnswers }) {
  return (
    <div className="result-container">
      <h2>Your Predicted Values/Beliefs</h2>
      <p>Your predicted values or beliefs are: <strong>{predictedValues}</strong></p>

      <h3>Details of Your Responses</h3>
      <ul>
        {userAnswers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
