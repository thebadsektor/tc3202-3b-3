// src/components/Header.jsx
import React, { useState, useEffect } from "react";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className='bg-[#202021] p-4'>
        <ul className='flex justify-center list-none m-0 p-0 w-full'>
          <li>
            <a
              href='#home'
              className='block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center max-w-[130px] min-w-[130px]'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='#about'
              className='block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center max-w-[130px] min-w-[130px]'
            >
              About us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
