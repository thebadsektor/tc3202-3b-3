import React, { useEffect } from "react";
import mainstreamNews from "../data/mainstreamNews";

const MediaWebsites = () => {
  useEffect(() => {
    document.title = "Media Resources";
  }, []);

  return (
    <div className="pt-28 px-4 max-w-4xl mx-auto">
      <h1 className="bg-[#003366] p-4 rounded-md text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Philippine Political News & Media Sites
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
        {mainstreamNews.map((site, i) => (
          <a
            key={i}
            href={site.sites_url}
            target="_blank"
            rel="noopener noreferrer"
            title={site.name}
            className="transition-transform hover:scale-105"
          >
            <div className="bg-[#FFFFFF] rounded-lg shadow-md flex items-center justify-center aspect-square p-4">
              <img
                src={site.logo_url}
                alt={site.name}
                className="object-contain"
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
  );
};

export default MediaWebsites;
