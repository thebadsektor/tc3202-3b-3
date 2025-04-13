import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/introbg.png";

function GetStarted() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/personal-test");
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "contain",
        }}
        className='flex-1 w-full bg-[#202021] text-white flex flex-col'
      >
        <Header />
        <div className='flex flex-col items-center gap-4 mt-10'>
          <h1 className='text-4xl font-semibold text-center mb-10'>
            Welcome to Political View Recommendation System
          </h1>
          <button
            onClick={handleGetStarted}
            className='card text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black py-4 px-6 text-lg rounded-lg border-1 border-white'
          >
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default GetStarted;
