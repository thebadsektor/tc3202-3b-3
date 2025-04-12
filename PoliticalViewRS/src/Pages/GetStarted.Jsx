import React from 'react';
import './GetStarted.css'; 

function App() {
  const handleGetStarted = () => {
    alert('Test Started');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to Political View RS</h1>
      </header>

      <main className="app-main">
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </main>
    </div>
  );
}

export default App;
