import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Municipal icon.png";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav className="bg-[#202021] p-4 flex items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center no-underline z-50">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
          <span className="text-white font-bold text-lg">PoliTest</span>
        </Link>

        {/* Burger Menu (mobile only) */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-0 list-none m-0 p-0 absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link
              to="/"
              className="block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/news-sites"
              className="block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center"
            >
              News & Media
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center"
            >
              About us
            </Link>
          </li>
          {/* <li>
            <Link
              to="/candidate-profile"
              className="block text-white font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm text-center"
            >
              Profile
            </Link>
          </li> */}
        </ul>
        {/* <Link
          to={resultExists ? "/result" : "#"}
          onClick={(e) => {
            if (!resultExists) {
              e.preventDefault(); // ❌ stop navigation
              setShowModal(true); // ✅ open modal
            }
          }}
          className="text-white font-bold bg-[#404040] hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm hidden md:block cursor-pointer text-center"
        >
          {resultExists ? "Your Result" : "Take the Test"}
        </Link> */}

        {/* Take the Test Button (always visible) */}
        {/* <button
          onClick={() =>
            resultExists ? navigate("/result") : setShowModal(true)
          }
          className="text-white font-bold bg-[#404040] hover:bg-white hover:text-black transition duration-200 py-2 px-5 rounded-sm hidden md:block cursor-pointer"
        >
          {resultExists ? "Your Result" : "Take the Test"}
        </button> */}

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#202021] text-white flex flex-col items-center py-4 space-y-2 z-40">
            <Link
              to="/"
              className="block font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 text-center"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/news-sites"
              className="block font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 text-center"
              onClick={toggleMenu}
            >
              News & Media
            </Link>
            <Link
              to="/about"
              className="block font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 text-center"
              onClick={toggleMenu}
            >
              About us
            </Link>

            {/* <Link
              to={resultExists ? "/result" : "#"}
              onClick={(e) => {
                if (!resultExists) {
                  e.preventDefault();
                  setShowModal(true);
                }
                toggleMenu(); // ✅ close mobile menu
              }}
              className="bg-[#404040] hover:bg-white hover:text-black cursor-pointer transition duration-200 py-2 px-5 rounded-sm font-bold w-3/4 text-center"
            >
              {resultExists ? "Your Result" : "Take the Test"}
            </Link> */}

            {/* <Link
              to="/candidate-profile"
              className="block font-bold no-underline hover:bg-white hover:text-black transition duration-200 py-2 px-5 text-center"
              onClick={toggleMenu}
            >
              Profile
            </Link> */}
            {/* <button
              onClick={() => {
                resultExists ? navigate("/result") : setShowModal(true);
                toggleMenu();
              }}
              className="bg-[#404040] hover:bg-white hover:text-black cursor-pointer transition duration-200 py-2 px-5 rounded-sm font-bold w-3/4"
            >
              {resultExists ? "Your Result" : "Take the Test"}
            </button> */}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
