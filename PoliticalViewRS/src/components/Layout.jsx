import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#202021]">
      <Header />
      <main className="flex-1">{children}</main> 
      <Footer />
    </div>
  );
}

export default Layout;
