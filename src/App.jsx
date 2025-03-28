import { useState } from 'react';
import './App.css';
import introBackground from './assets/introbg.png';
import mainBackground from './assets/Background.png';
import CardLayout from './components/card';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleContinue = () => {
    setShowIntro(false);
  };

  return (
    <div className="App" style={{
      backgroundImage: showIntro ? `url(${introBackground})` : `url(${mainBackground})`,
      backgroundSize: showIntro ? 'cover' : 'contain',
      backgroundPosition: showIntro ? 'center' : 'bottom center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#212121',
      minHeight: '100vh'
    }}>
      {showIntro ? (
        <div className="intro-container">
          <div className="intro-content">
            <h1 className="intro-title">Welcome to Our Application</h1>
            <p className="intro-text">
              This is a brief introduction to what this application does.
            </p>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      ) : (
        <CardLayout />
      )}
    </div>
  );
}

export default App;