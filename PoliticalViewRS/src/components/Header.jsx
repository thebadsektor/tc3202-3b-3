import React from "react";

function Header() {
  return (
    <nav className='bg-[#202021] p-4'>
       <ul className='flex justify-center gap-8 list-none m-0 p-0'>
        <li>
          <a
             href='#home'
             className='text-white font-bold no-underline hover:underline'
           >            
            Home
          </a>
        </li>
        <li>
          <a
            href='#Resources'
            className='text-white font-bold no-underline hover:underline'
          >
             Resources
          </a>
        </li>
        <li>
          <a
             href='#About us'
             className='text-white font-bold no-underline hover:underline'
           >
             About us
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
