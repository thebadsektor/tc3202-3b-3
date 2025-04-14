import React from "react";

function SimpleLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  );
}

export default SimpleLayout;
