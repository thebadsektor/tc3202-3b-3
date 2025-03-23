import { useState } from 'react'
import './App.css'
import SearchBox from './components/SearchBox'
import CardLayout from './components/card'


function App() {
  // const [results, setResults] = useState([]);

  return (
    <div className="App">
      {/* <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultList results={results} />
      </div>  */}
      
      <CardLayout />
    
    </div>
  )
}

export default App
