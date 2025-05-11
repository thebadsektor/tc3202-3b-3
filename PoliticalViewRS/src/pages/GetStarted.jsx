import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/introbg.png";
import Header from "../components/Header";
import PoliticalTestModal from "../components/PoliticalTestModal";
import mainstreamNews from "../data/mainstreamNews";
import { motion as Motion } from "framer-motion";

function GetStarted() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowModal(true);
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex(
        (prevIndex) => (prevIndex + 1) % mainstreamNews.length
      );
    }, 4000); // rotates every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <section
        id="home"
        className="relative h-screen w-full bg-[#202021] text-white flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "contain",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="bg-[#202021]/10 backdrop-blur-md rounded-xl p-10 max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              Vote with clarity. Choose with confidence.
            </h1>
            <p className="text-sm md:text-base text-gray-200">
              Our system helps users explore their political values and compare
              them with the positions of various politicians. By analyzing
              personal insights, it delivers tailored candidate
              recommendations—empowering voters to make informed, value-driven
              decisions.
            </p>
          </div>
          <button
            onClick={handleGetStarted}
            className="text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black py-4 px-8 text-lg rounded-lg border border-white font-bold"
          >
            Get Started
          </button>
        </div>
      </section>

      <PoliticalTestModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <section className="bg-[#000] h-screen px-8 flex flex-col lg:flex-row items-center justify-center gap-12 transition-all duration-1000 ease-in-out">
        {/* Left Block */}
        <div className="max-w-md text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-gray-200 mb-4">
            STAY INFORMED
            <br />
            EMPOWER YOUR VOTE
          </h2>
          <p className="text-gray-400 mb-6">
            Explore trusted news sources covering the latest in politics and
            Halalan 2025. Get insights from leading media outlets to make
            informed, value-driven decisions.
          </p>
          <button
            onClick={() => navigate("/news-sites")}
            className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-3 px-6 rounded shadow transition duration-300 transform hover:scale-105"
          >
            Show More News Media
          </button>
        </div>

        {/* Right Card */}
        <div className="relative w-[350px] h-[220px] rounded overflow-hidden shadow-2xl group transition-transform duration-700 transform hover:scale-105">
          <img
            key={mainstreamNews[currentNewsIndex].logo_url}
            src={mainstreamNews[currentNewsIndex].logo_url}
            alt={mainstreamNews[currentNewsIndex].name}
            className="absolute inset-0 object-contain w-full h-full opacity-80 transition-opacity duration-700"
          />
          <div className="absolute bottom-0 w-full bg-black/60 text-gray-200 p-4">
            <h3 className="text-xl font-bold">
              {mainstreamNews[currentNewsIndex].name}
            </h3>
            <p className="text-sm"></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetStarted;
