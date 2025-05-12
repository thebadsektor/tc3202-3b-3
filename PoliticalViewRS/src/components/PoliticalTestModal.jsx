import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PoliticalTestModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("");

  if (!show) return null;

  const handleStart = () => {
    if (!language) {
      alert("Please select a language before starting the test.");
      return;
    }
    localStorage.setItem("selectedLanguage", language);
    navigate("/political-test");
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="bg-white text-black rounded-xl shadow-lg p-8 max-w-md w-full relative flex flex-col items-center text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Before You Begin</h2>
        <p className="mb-4 text-lg font-bold text-black">
          Vote at your own preference. Be wise to vote.
        </p>
        <p className="mb-6">
          Political View Recommendation System analyzes your values through a
          short question and answer to determine your political alignment. It
          only takes a few minutes and helps match you with candidates that
          share your views.
        </p>

        {/* Language selection */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select Language --</option>
          <option value="tagalog">Tagalog</option>
          <option value="english">English</option>
        </select>

        <button
          onClick={handleStart}
          className="bg-[#202021] hover:bg-black text-white py-3 px-6 rounded-md font-semibold w-full"
        >
          Start the test
        </button>
      </div>
    </div>
  );
};

export default PoliticalTestModal;
