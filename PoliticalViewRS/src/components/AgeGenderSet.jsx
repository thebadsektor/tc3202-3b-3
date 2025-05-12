// src/components/AgeGenderSet.jsx
import React, { useEffect } from "react";
import Card from "./Card";

export const AgeSet = ({ onSelectAge }) => {
  const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

  useEffect(() => {
    document.title = "Select Age";
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8">
      <p className="text-2xl font-medium text-white mb-4">Age Group</p>

      <div className="flex flex-wrap justify-center items-center gap-4 w-full px-4">
        {ageOptions.map((option) => (
          <Card
            key={option}
            content={option}
            className="w-auto text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-105 hover:text-black py-3 px-5 text-base rounded-lg border border-white"
            onClick={() => onSelectAge(option)}
          />
        ))}
      </div>
    </div>
  );
};

export const GenderSet = ({ onSelectGender }) => {
  const genderOptions = ["Male", "Female", "Other"];

  useEffect(() => {
    document.title = "Select Gender";
  }, []);

  return (
    <div className="flex flex-col items-center space-y-8">
      <p className="text-2xl font-medium text-white mb-4">Gender</p>

      <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
        {genderOptions.map((option) => (
          <Card
            key={option}
            content={option}
            className="w-full text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-105 hover:text-black py-4 px-6 text-lg rounded-lg border border-white"
            onClick={() => onSelectGender(option)}
          />
        ))}
      </div>
    </div>
  );
};
