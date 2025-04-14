import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bgImage from "../assets/introbg.png";

function GetStarted() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/personal-test");
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className='GetStartedPage min-h-screen overflow-hidden'>
  <div
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "bottom",
      backgroundSize: "contain",
    }}
    // className='relative flex-1 w-full bg-[#202021] text-white flex flex-col'
    className="relative w-full h-screen flex flex-col justify-center items-center text-white"
  >

    <div className='absolute top-32 left-0 right-0 text-center px-4'>
      <h1 className='text-3xl md:text-4xl font-semibold'>
        Welcome to Political View Recommendation System
      </h1>
    </div>

    <div className='flex-1 flex items-center justify-center'>
      <button
        onClick={handleGetStarted}
        className='text-white !bg-[#303030] hover:!bg-white transform transition-transform duration-200 hover:scale-110 hover:text-black py-5 px-10 text-xl rounded-lg border border-white font-bold'
      >
        Get Started
      </button>
    </div>
  </div>

</div>

  );
}

export default GetStarted;
