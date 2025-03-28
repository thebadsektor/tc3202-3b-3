import React, { useState } from 'react';
import './CardLayout.css';

function Card({ title, content, className, onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <h2>{title}</h2>
      <p>"{content}"</p>
    </div>
  );
}

function CardLayout()
{

  const contentArray = [
    "Integrity is the foundation of trust and the key to building lasting relationships.",
    "Taking responsibility means owning your actions and their consequences, whether positive or negative.",
    "Kindness has the power to create change by uplifting others and spreading compassion.",
    "Empathy allows us to connect with others on a deeper level, understanding their feelings and experiences.",
    "Respect is the recognition of others' worth and the acknowledgement of their unique perspectives.",
    "Courage is the willingness to take risks and face challenges, even when fear stands in the way.",
    "Perseverance is the strength to continue striving toward your goals, despite obstacles and setbacks.",
    "Honesty is the ability to speak truthfully, even when it is difficult, and build trust with others.",
    "Being accountable means accepting responsibility for your actions and their outcomes.",
    "Gratitude is recognizing the good in your life and being thankful for the people and experiences that enrich it."
  ];


  const [card1Content, setCard1Content] = useState(contentArray[0]);
  const [card2Content, setCard2Content] = useState(contentArray[1]);


  const changeContent = () => {
    let randomIndex1 = Math.floor(Math.random() * contentArray.length);
    let randomIndex2 = Math.floor(Math.random() * contentArray.length);


    while (randomIndex1 === randomIndex2) {
      randomIndex2 = Math.floor(Math.random() * contentArray.length);
    }

    setCard1Content(contentArray[randomIndex1]);
    setCard2Content(contentArray[randomIndex2]);
  };

  return (
    <div className="card-container">
      <Card 
        title="" 
        content={card1Content} 
        className="card-first" 
        onClick={changeContent} 
      />
      <Card 
        title="" 
        content={card2Content} 
        className="card-second" 
        onClick={changeContent} 
      />
    </div>
  );
}

export default CardLayout;
