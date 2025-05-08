import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import aboutDevelopers from "../data/aboutDevelopers";

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth overflow-x-hidden">
      {/* About Section */}
      <section
        id="about"
        className="bg-[#303030] text-white min-h-screen flex items-center justify-center px-6"
        data-aos="fade-down"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="max-w-3xl text-lg mb-10">
            We’re a team that’s passionate about helping people figure out where
            they stand politically by exploring their core values. With a unique
            questionnaire and smart AI, we connect users with political
            candidates who genuinely reflect what they care about.
          </p>
          <button
            onClick={() => {
              const section = document.getElementById("developer-junie");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white border border-white rounded-full px-6 py-2 hover:bg-white hover:text-[#202021] transition-all duration-300"
          >
            ↓ Developers
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
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:justify-between">
            {/* Image first on odd, text first on even */}
            {index % 2 === 0 ? (
              <>
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {dev.name}
                  </h2>
                  <h3 className="text-xl md:text-2xl text-gray-400 mb-6">
                    {dev.position}
                  </h3>
                  <p className="text-gray-300">{dev.details}</p>
                </div>
                <div className="md:w-1/3 w-full">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-[400px] h-[500px] object-cover border-4 border-white rounded-xl"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="md:w-1/3 w-full mb-8 md:mb-0">
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-[400px] h-[500px] object-cover border-4 border-white rounded-xl"
                  />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    {dev.name}
                  </h2>
                  <h3 className="text-xl md:text-2xl text-gray-400 mb-6">
                    {dev.position}
                  </h3>
                  <p className="text-gray-300">{dev.details}</p>
                </div>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AboutUs;
