// components/PoliticianCard.jsx
import React from "react";

const PoliticianCard = ({ candidate, onCardClick }) => {
  const { full_name, nickname, party, link_image } = candidate;

  return (
    <div
      onClick={() => onCardClick(candidate)}
      className="flex items-center space-x-4 bg-[#545252] p-2 rounded-xl shadow-sm cursor-pointer transition-transform duration-150 hover:scale-105 hover:shadow-lg"
    >
      <img
        src={link_image}
        alt={full_name}
        className="w-10 h-10 rounded-full object-cover border-2 border-white"
      />
      <div>
        <h2 className="text-base text-white font-normal">{nickname}</h2>
        <p className="text-xs text-gray-300">{party}</p>
      </div>
    </div>
  );
};

export default PoliticianCard;
