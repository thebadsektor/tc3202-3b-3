import React, { useEffect, useState } from "react";
import mainstreamNews from "../data/mainstreamNews";
import { motion as Motion } from "framer-motion";

const MediaWebsites = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.title = "Media Resources";

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className='fixed top-0 left-0 w-full h-0.5 z-[9999] bg-transparent'>
        <div
          className='h-full transition-all duration-400 ease-out rgb-animate'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className='min-h-screen w-full bg-[#303030]'>
        <div className='min-h-screen bg-[#303030] pt-28 pb-1 px-4 max-w-4xl mx-auto'>
          <h1 className='font-mono p-4 rounded-md text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white'>
            Philippine Political News & Media Sites
          </h1>

          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8'>
            {mainstreamNews.map((site, i) => (
              <a
                key={i}
                href={site.sites_url}
                target='_blank'
                rel='noopener noreferrer'
                title={site.name}
                className='transition-transform hover:scale-105'
              >
                <div className='bg-[#FFFFFF] rounded-lg shadow-md flex items-center justify-center aspect-square p-4'>
                  <img
                    src={site.logo_url}
                    alt={site.name}
                    className='object-contain'
                    style={{
                      maxHeight: "60px",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaWebsites;
