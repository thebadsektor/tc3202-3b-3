import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <nav className="app-nav">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#settings">Settings</a></li>
        <li><a href="#help">Help</a></li>
      </ul>
    </nav>
  );
}

export default Header;
