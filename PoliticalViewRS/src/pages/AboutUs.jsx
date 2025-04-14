// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className='flex flex-col items-center justify-center text-white p-10 min-h-screen'>
      <h1 className='text-4xl font-bold mb-6'>About Us</h1>
      <p className='max-w-3xl text-lg text-center mb-8'>
        We are a team passionate about helping people understand their political
        alignment by analyzing values through a unique questionnaire. Our system
        uses AI to recommend political candidates that resonate with your values.
      </p>

     
      <div className='flex flex-col items-center'>
        <img
          src='https://via.placeholder.com/150' // Replace this with your developer's image URL
          alt='Developer'
          className='w-40 h-40 rounded-full border-4 border-white mb-4'
        />

      
        <p className='text-xl font-semibold'>John Doe</p>

        <p className='text-lg text-gray-300'>Frontend Developer</p>
      </div>
    </div>
  );
};

export default AboutUs;
