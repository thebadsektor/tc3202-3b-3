import React from "react";
import { motion as Motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#202021]">
      <Header />

      {/* Animate the main page content */}
      <Motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </Motion.main>

      <Footer />
    </div>
  );
}

export default Layout;
