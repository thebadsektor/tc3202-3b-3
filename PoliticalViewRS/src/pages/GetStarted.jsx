import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import bgImage from "../assets/introbg.png";
import DeveloperCard from "../components/DeveloperCard";
import Header from "../components/Header";
import junieImg from "../assets/Developers/junie.JPG";
import genesisImg from "../assets/Developers/genesis.jpg";
import nicksImg from "../assets/Developers/nicks.jpg";
import gabsImg from "../assets/Developers/gabs.jpg";



function GetStarted() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true); // Show the modal
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
        <div className='absolute top-24 left-0 right-0 text-center px-4 flex flex-col items-center'>
          <h1 className='text-3xl md:text-4xl font-semibold max-w-3xl mb-8'>
            Vote with clarity. Choose with confidence.
          </h1>
          <p className='max-w-2xl text-sm md:text-base text-gray-300'>
            Our system helps users explore their political values and compare them with the positions of various politicians.
            By analyzing personal insights, it delivers tailored candidate recommendations—empowering voters to make informed, value-driven decisions.
          </p>
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
      We’re a team that’s passionate about helping people figure out where they stand 
      politically by exploring their core values. With a unique questionnaire and smart AI, 
      we connect users with political candidates who genuinely reflect what they care about.
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
          image={gabsImg}
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
        image={nicksImg}
        name='Nicole Dolorico'
        role='Documentation'
      />
    </div>

    </section>

    {showModal && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white text-black rounded-xl shadow-lg p-8 max-w-md w-full relative flex flex-col items-center text-center'>
           <button
            onClick={() => setShowModal(false)}
            className='absolute top-2 right-4 text-black text-2xl font-bold'
            >
              &times;
            </button>
            <h2 className='text-2xl font-bold mb-4'>Before You Begin</h2>
            <p className='mb-6'>
              Political View Recommendation System analyzes your values through a short question and answer to determine your political alignment. It only takes a few minutes and helps match you with candidates that share your views.
            </p>
            <button
              onClick={() => navigate("/personal-test")}
              className='bg-[#202021] hover:bg-black text-white py-3 px-6 rounded-md font-semibold w-full'
            >
              Start the test
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GetStarted;
