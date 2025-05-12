// components/PoliticianCard.jsx
import React from "react";

const PoliticianCard = ({ candidate, onCardClick }) => {
  const { full_name, nickname, party, link_image } = candidate;

  return (
    <div
      onClick={() => onCardClick(candidate)}
      className='flex items-center space-x-4 px-4 bg-[#303030] p-4 rounded-xl shadow-sm cursor-pointer transition-transform duration-150 hover:scale-105 hover:shadow-lg'
    >
      <img
        src={link_image}
        alt={full_name}
        className='w-15 h-15 rounded-full object-cover border-1 border-white'
      />
      <div>
        <h2 className='text-white font-mono text-3xl font-bold'>{nickname}</h2>
        <p className='text-lg text-white italic'>{party}</p>
      </div>
    </div>
  );
};

export default PoliticianCard;
