import { useState } from "react";
import "./App.css";
import PersonalTest from "./components/PersonalTest";

function App() {
  // const [results, setResults] = useState([]);

  return (
    <div className='App'>
      {/* <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultList results={results} />
      </div>  */}

      <PersonalTest />
    </div>
  );
}

export default App;
