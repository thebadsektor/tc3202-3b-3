import React from 'react';

function Header() {
  return (
    <nav className="bg-[#444] p-4">
      <ul className="flex justify-center gap-8 list-none m-0 p-0">
        <li>
          <a href="#home" className="text-white font-bold no-underline hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#settings" className="text-white font-bold no-underline hover:underline">
            Settings
          </a>
        </li>
        <li>
          <a href="#help" className="text-white font-bold no-underline hover:underline">
            Help
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
