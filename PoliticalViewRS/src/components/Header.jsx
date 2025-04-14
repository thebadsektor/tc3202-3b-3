import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className='bg-[#202021] p-4'>
      <ul className='flex justify-center list-none m-0 p-0 w-full'>
        <li>
          <Link
            to='/'
            className='block text-white font-bold no-underline hover:bg-white hover:text-black transform transition-transform duration-200 py-2 px-5 rounded-sm border-white focus:outline-none focus:bg-white focus:text-black text-center max-w-[130px] min-w-[130px]'
          >
            Home
          </Link>
        </li>
        {/* <li>
          <a
            href='#Resources'
            className='block text-white font-bold no-underline hover:bg-white hover:text-[#202021] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:text-[#202021] hover:border-b-2 hover:border-white transition-all duration-200 p-2 text-center max-w-[150px]'
          >
            Resources
          </a>
        </li> */}
        <li>
          <Link
            to='/about'
            className='block text-white font-bold no-underline hover:bg-white hover:text-black transform transition-transform duration-200 py-2 px-5 rounded-sm border-white focus:outline-none focus:bg-white focus:text-black text-center max-w-[130px] min-w-[130px]'
          >
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
