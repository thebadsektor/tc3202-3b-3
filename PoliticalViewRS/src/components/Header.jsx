import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Municipal icon.png";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className='bg-[#202021] p-4 flex items-center justify-between px-6 md:px-12'>
        {/* Logo */}
        <Link to='/' className='flex items-center no-underline group z-50'>
          <div className='w-10 h-10 mr-2 transform transition-transform duration-250 group-hover:scale-130'>
            <img
              src={logo}
              alt='Logo'
              className='h-full w-full object-contain'
            />
          </div>
          <span className='text-white text-2xl font-mono font-semi transform transition-all mt-2 duration-250  group-hover:-translate-x-10 group-hover:opacity-0 overflow-hidden'>
            PoliTest
          </span>
        </Link>

        {/* Burger Menu (mobile only) */}
        <div className='md:hidden z-50'>
          <button
            onClick={toggleMenu}
            className='text-white text-3xl focus:outline-none'
          >
            ☰
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className='hidden md:flex gap-0 list-none m-0 p-0 absolute left-1/2 transform -translate-x-1/2'>
          <li>
            <Link
              to='/'
              className={`block text-xl no-underline py-2 px-5 rounded-sm text-center transition duration-150 ${
                location.pathname === "/"
                  ? "bg-cyan-300 text-black font-bold"
                  : "text-white hover:bg-cyan-300 hover:text-black font-semibold"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/news-sites'
              className={`block text-xl no-underline py-2 px-5 rounded-sm text-center transition duration-150 ${
                location.pathname === "/news-sites"
                  ? "bg-cyan-300 text-black font-bold"
                  : "text-white hover:bg-cyan-300 hover:text-black font-semibold"
              }`}
            >
              News & Media
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className={`block text-xl no-underline py-2 px-5 rounded-sm text-center transition duration-150 ${
                location.pathname === "/about"
                  ? "bg-cyan-300 text-black font-bold"
                  : "text-white hover:bg-cyan-300 hover:text-black font-semibold"
              }`}
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className='md:hidden absolute top-full left-0 w-full bg-[#202021] text-white flex flex-col items-center py-4 space-y-2 z-40'>
            <Link
              to='/'
              className={`block text-xl font-mono no-underline py-2 px-5 text-center transition duration-200 ${
                location.pathname === "/"
                  ? "bg-cyan-300 text-black font-bold"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to='/news-sites'
              className={`block text-xl font-mono no-underline py-2 px-5 text-center transition duration-200 ${
                location.pathname === "/news-sites"
                  ? "bg-cyan-300 text-black font-bold"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={toggleMenu}
            >
              News & Media
            </Link>
            <Link
              to='/about'
              className={`block text-xl font-mono no-underline py-2 px-5 text-center transition duration-200 ${
                location.pathname === "/about"
                  ? "bg-cyan-300 text-black font-bold"
                  : "hover:bg-white hover:text-black"
              }`}
              onClick={toggleMenu}
            >
              About Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
