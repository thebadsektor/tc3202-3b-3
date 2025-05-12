import React, { useState } from "react";
import slides from "../data/instructionsSlides";

const InstructionsModal = ({ show, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState("english");

  if (!show) return null;

  const current = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="bg-white text-black  shadow-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-lg max-h-[85vh] overflow-y-auto relative flex flex-col items-center text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-black text-3xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Guide for Test</h2>

        {/* Image */}
        <img
          src={current.image}
          alt={`Slide ${currentSlide + 1}`}
          className="mb-4 max-w-full w-full sm:w-[600px] h-auto object-cover shadow-md rounded-xl transition-all duration-300"
        />

        {/* Language Switch */}
        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setLanguage("english")}
            className={`py-2 px-4 sm:px-6 font-semibold rounded-md transition ${
              language === "english"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("tagalog")}
            className={`py-2 px-4 sm:px-6 font-semibold rounded-md transition ${
              language === "tagalog"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Tagalog
          </button>
        </div>

        {/* Description */}
        <p className="mb-8 text-lg sm:text-2xl text-justify px-2 sm:px-4">
          {current[language]}
        </p>

        {/* Navigation Row: Previous + Indicators + Next */}
        <div className="mt-auto w-full flex flex-row justify-between items-center gap-2 px-4 pb-4">
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
            className="bg-[#202021] hover:opacity-90 text-white py-1.5 w-24 rounded-md text-sm transition"
            disabled={currentSlide === 0}
          >
            Prev
          </button>

          {/* Circle Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-black scale-110 ring-2 ring-black/10"
                    : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
            }
            className="bg-[#202021] hover:opacity-90 text-white py-1.5 w-24 rounded-md text-sm transition"
            disabled={currentSlide === slides.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
