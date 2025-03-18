import React, { useState, useEffect, useRef } from 'react';
import './StatementCards.css';

function StatementCards() {
  const cardA = useRef(null);
  const cardB = useRef(null);
  const [cardWidth, setCardWidth] = useState(null);

  useEffect(() => {
    const calculateWidth = () => {
      if (cardA.current && cardB.current) {
        const widthA = cardA.current.offsetWidth;
        const widthB = cardB.current.offsetWidth;
        setCardWidth(Math.max(widthA, widthB));
      }
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, []);

  const handleCard1Click = () => {
    console.log("Card 1 clicked!");

  };

  const handleCard2Click = () => {
    console.log("Card 2 clicked!");

  };

  return (
    <div className="statement-cards-container">
      <div
        className="statement-card"
        onClick={handleCard1Click}
        ref={cardA}
        style={{ width: cardWidth ? `${cardWidth}px` : 'fit-content' }}
      >
        <h2>Option A</h2>
        <p>
          This is the statement for option A. It can be anything you want.
          This is the statement for option A. It can be anything you want.
          This is the statement for option A. It can be anything you want.
          This is the statement for option A. It can be anything you want.
          This is the statement for option A. It can be anything you want.
          This is the statement for option A. It can be anything you want.
        </p>
      </div>
      <div
        className="statement-card"
        onClick={handleCard2Click}
        ref={cardB}
        style={{ width: cardWidth ? `${cardWidth}px` : 'fit-content' }}
      >
        <h2>Option B</h2>
        <p>This is the statement for option B. You can customize this text.</p>
      </div>
    </div>
  );
}

export default StatementCards;