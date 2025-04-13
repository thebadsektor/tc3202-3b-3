import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function GetStarted() {
  const navigate = useNavigate(); // Hook from react-router

  const handleGetStarted = () => {
     navigate('/personal-test'); // Navigates to PersonalTest
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f5f7fa] text-gray-900">

      <Header />

      <header className="bg-[#2e3138] text-white p-5 text-center">
        <h1 className="text-3xl font-semibold">Welcome to Political View RS</h1>
      </header>

      <main className="flex-1 flex justify-center items-center">
        <button
          className="px-6 py-4 text-[1.2rem] rounded-[10px] bg-black text-white font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-[#3f3f3f] hover:scale-105"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </main>

      <Footer />

    </div>
  );
}

export default GetStarted;
