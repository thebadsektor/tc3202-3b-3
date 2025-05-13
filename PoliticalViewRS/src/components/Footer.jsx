import React from "react";
import { Link } from "react-router-dom";
import mainstreamNews from "../data/mainstreamNews";

function Footer() {
  return (
    <footer className='bg-[#000000] text-white text-md text-sm'>
      {/* First Row - Two Columns */}
      <div className='flex flex-col md:flex-row justify-center items-center pt-3 px-6 mb-5 text-center'>
        {/* Contributors Column */}
        <div className='flex flex-col items-center'>
          <h3 className='font-bold font-mono text-2xl mb-2'>Contributors</h3>
          <ul className='space-y-1'>
            <li>
              <Link
                to='/about#developer-junie'
                className='text-white text-md hover:bg-cyan-300 hover:font-bold hover:text-black px-2 py-1 rounded'
              >
                Junie Antopina
              </Link>
            </li>
            <li>
              <Link
                to='/about#developer-genesis'
                className='text-white text-md hover:bg-cyan-300 hover:font-bold hover:text-black px-2 py-1 rounded'
              >
                Genesis Delos Reyes
              </Link>
            </li>
            <li>
              <Link
                to='/about#developer-nicole'
                className='text-white text-md hover:bg-cyan-300 hover:font-bold hover:text-black px-2 py-1 rounded'
              >
                Nicole Dolorico
              </Link>
            </li>
            <li>
              <Link
                to='/about#developer-angelo'
                className='text-white text-md hover:bg-cyan-300 hover:font-bold hover:text-black px-2 py-1 rounded '
              >
                Angelo Gabot
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className='flex flex-col items-center'>
          <h3 className='font-bold font-mono text-2xl mb-2'>Resources</h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
            {mainstreamNews.map((news, index) => (
              <a
                key={index}
                href={news.sites_url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white text-md hover:text-cyan-300 px-2 py-1'
              >
                {news.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row - Copyright */}
      <div className='flex flex-col items-center'>
        <div className='font-semibold text-center text-white text-lg '>
          © Political View Recommendation System
        </div>
      </div>
    </footer>
  );
}

export default Footer;
