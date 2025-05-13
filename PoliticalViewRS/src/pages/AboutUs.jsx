import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import aboutDevelopers from "../data/aboutDevelopers";
import "../index.css";

const AboutUs = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);

      setShowScrollTop(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();

  useEffect(() => {
    document.title = "About Us";
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className='fixed top-0 left-0 w-full h-0.5 z-[9999] bg-transparent'>
        <div
          className='h-full transition-all duration-400 ease-out rgb-animate'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className='flex flex-col min-h-screen scroll-smooth overflow-x-hidden'>
        {/* About Section */}
        <section
          id='about'
          className='bg-[#303030] text-white min-h-screen flex items-center justify-center px-6'
          data-aos='fade-down'
        >
          <div className='flex flex-col items-center justify-center text-center'>
            <h1 className='text-6xl font-semibold mb-6'>About Us</h1>
            <p className='text-white max-w-4xl font-semibold text-xl pb-7 mb-10'>
              We’re a team that’s passionate about helping people figure out
              where they stand politically by exploring their core values. With
              a unique questionnaire and smart AI, we connect users with
              political candidates who genuinely reflect what they care about.
            </p>
            <button
              onClick={() => {
                const section = document.getElementById("developer-junie");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className='text-white font-semibold text-2xl border cursor-pointer border-white rounded-full px-6 py-4 hover:bg-cyan-300 hover:text-black transition-all duration-150'
            >
              🡇 Developers
            </button>
          </div>
        </section>

        {aboutDevelopers.map((dev, index) => (
          <section
            key={index}
            id={dev.id}
            className={`bg-[#202021] text-white w-full px-6 py-16`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between'>
              {index % 2 === 0 ? (
                <>
                  <div className='md:w-1/2 text-center md:text-left mb-8 md:mb-0'>
                    <h2 className='text-3xl md:text-5xl text-white font-bold mb-2'>
                      {dev.name}
                    </h2>
                    <h3 className='text-xl md:text-3xl font-semibold italic text-cyan-400 mb-6'>
                      {dev.position}
                    </h3>
                    <p className='text-2xl text-white text-justify'>
                      {dev.details}
                    </p>
                  </div>
                  <div className='md:w-1/3 w-full'>
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className='w-[400px] h-[500px] object-cover border-4 border-white rounded-xl'
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='md:w-1/3 w-full mb-8 md:mb-0'>
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className='w-[400px] h-[500px] object-cover border-4 border-white rounded-xl'
                    />
                  </div>
                  <div className='md:w-1/2 text-center md:text-left'>
                    <h2 className='text-3xl md:text-5xl text-white font-bold mb-2'>
                      {dev.name}
                    </h2>
                    <h3 className='text-xl md:text-3xl font-semibold italic text-cyan-400 mb-6'>
                      {dev.position}
                    </h3>
                    <p className='text-2xl text-white text-justify'>
                      {dev.details}
                    </p>
                  </div>
                </>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Back to Top Section */}
      <section className='text-white flex justify-center items-center'>
        <button
          onClick={scrollToTop}
          className='text-white bg-[#202021] cursor-pointer animate-bounce text-2xl font-mono font-bold mt-10 mb-10 hover:text-cyan-400'
        >
          🡅 Back to Top
        </button>
      </section>
    </>
  );
};

export default AboutUs;
