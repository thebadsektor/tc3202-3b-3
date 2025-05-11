import React from "react";
import { Link } from "react-router-dom";
import mainstreamNews from "../data/mainstreamNews";

function Footer() {
  return (
    <footer className="bg-[#000] text-white text-sm">
      {/* First Row - Two Columns */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 py-6 border-b border-white-600 text-center">
        {/* Contributors Column */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-4 text-base">Contributors</h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/about#developer-junie"
                className="text-gray-300 hover:bg-white hover:text-black px-2 py-1 rounded transition"
              >
                Junie Antopina
              </Link>
            </li>
            <li>
              <Link
                to="/about#developer-angelo"
                className="text-gray-300 hover:bg-white hover:text-black px-2 py-1 rounded transition"
              >
                Angelo Gabot
              </Link>
            </li>
            <li>
              <Link
                to="/about#developer-genesis"
                className="text-gray-300 hover:bg-white hover:text-black px-2 py-1 rounded transition"
              >
                Genesis Delos Reyes
              </Link>
            </li>
            <li>
              <Link
                to="/about#developer-nicole"
                className="text-gray-300 hover:bg-white hover:text-black px-2 py-1 rounded transition"
              >
                Nicole Dolorico
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-4 text-base">Resources</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-gray-300">
            {mainstreamNews.map((news, index) => (
              <a
                key={index}
                href={news.sites_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:bg-white hover:text-black px-2 py-1 rounded transition"
              >
                {news.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Copyright */}
      <div className="bg-[#000] text-center py-4 text-white-400 text-sm border-t border-gray-700">
        © TC 3202 3B 3
      </div>
    </footer>
  );
}

export default Footer;
