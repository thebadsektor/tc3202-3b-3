import React from "react";

const DeveloperCard = ({ image, name, role }) => {
  return (
    <div className='flex flex-col items-center'>
      <img
        src={image}
        alt={name}
        className='w-52 h-52 object-cover rounded-full border-4 border-white mb-4'
      />
      <p className='text-2xl font-semibold'>{name}</p>
      <p className='text-lg text-gray-300 text-center'>{role}</p>
    </div>
  );
};

export default DeveloperCard;
