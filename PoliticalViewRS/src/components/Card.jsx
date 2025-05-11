import React from "react";

function Card({ content, className = "", onClick }) {
  return (
    <div
      className={`w-[300px] p-8 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:scale-105 bg-opacity-20 border border-gray-200 text-white ${className}`}
      onClick={onClick}
    >
      <p className="text-xl md:text-1xl text-center item-center tracking-widest">
        {content}
      </p>
    </div>
  );
}

export default Card;
