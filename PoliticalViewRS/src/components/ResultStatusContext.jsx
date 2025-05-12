// src/components/ResultStatusContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ResultStatusContext = createContext();

export const ResultStatusProvider = ({ children }) => {
  const [resultExists, setResultExists] = useState(false);

  useEffect(() => {
    const fetchResultStatus = async () => {
      const chatId = localStorage.getItem("chatId");
      if (!chatId) return;

      try {
        const response = await fetch(
          "http://127.0.0.1:5000/get-comparison-analysis",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId }),
          }
        );

        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setResultExists(data.analysis && data.analysis.length > 0);
      } catch {
        setResultExists(false);
      }
    };

    fetchResultStatus();
  }, []);

  return (
    <ResultStatusContext.Provider value={{ resultExists }}>
      {children}
    </ResultStatusContext.Provider>
  );
};

// ✅ This is critical. It must be named export.
export const useResultStatus = () => useContext(ResultStatusContext);
