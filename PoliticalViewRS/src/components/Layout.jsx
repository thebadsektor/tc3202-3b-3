import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>  {/* This will be dynamic content */}
      <Footer />
    </div>
  );
}

export default Layout;
