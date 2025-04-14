import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bgImage from "../assets/introbg.png";
import DeveloperCard from "../components/DeveloperCard";
import Header from "../components/Header";
import junieImg from "../assets/Developers/junie.JPG";
import genesisImg from "../assets/Developers/genesis.jpg";



function GetStarted() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/personal-test");
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

 
  return (
    <div className='flex flex-col min-h-screen scroll-smooth'>

      <Header />

      {/* Get Started Section (locked) */}
      <section
        id='home'
        className='relative h-screen w-full bg-[#202021] text-white flex flex-col overflow-hidden'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "contain",
        }}
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
      </section>

      <section id='about' className='!bg-[#303030] text-white'>

  {/* About Us Intro */}
  <div className=' flex flex-col items-center justify-center min-h-screen px-6 text-center'>
    <h1 className='text-4xl font-bold mb-6'>About Us</h1>
    <p className='max-w-3xl text-lg'>
      We are a team passionate about helping people understand their political
      alignment by analyzing values through a unique questionnaire. Our system
      uses AI to recommend political candidates that resonate with your values.
    </p>

    {/* ↓ Developers Button */}
    <button
      onClick={() => {
        const section = document.getElementById("developers");
        section?.scrollIntoView({ behavior: "smooth" });
      }}
      className='absolute mt-100 text-white border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#202021] transition-all duration-300'
    >
      ↓ Developers
    </button>
  </div>
</section>

    <section id='developers' className='bg-[#202021] text-white px-6 py-20'>

    <h2 className='text-3xl font-bold text-center mb-12'>Developers</h2>

    {/* Main Developer (visible right after title) */}
    <div className='flex justify-center min-h-[60vh] items-center'>
      <DeveloperCard
        image={junieImg}
        name='Junie Antopina'
        role='Lead Developer, Backend Developer'
      />
    </div>

    {/* Scroll to reveal: 2 Developers */}
    <div className='flex justify-center min-h-[60vh] items-center'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-40'>
        <DeveloperCard
          image='https://via.placeholder.com/150'
          name='Angelo Gabot'
          role='Full Stack Developer'
        />
        <DeveloperCard
          image= {genesisImg}
          name='Genesis Delos Reyes'
          role='Backend Developer'
        />
      </div>
    </div>

    {/* Scroll to reveal: Documentation */}
    <div className='flex justify-center min-h-[60vh] items-center'>
      <DeveloperCard
        image='https://via.placeholder.com/150'
        name='Nicole Dolorico'
        role='Documentation'
      />
    </div>

    </section>



      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GetStarted;
