import "./App.css";
import GetStarted from "./pages/GetStarted";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalTest from "./pages/PersonalTest"; 

function App() {
  // const [results, setResults] = useState([]);

  return (
    <Router>
     <Routes>
         <Route path='/' element={<GetStarted />} />
         <Route path='/personal-test' element={<PersonalTest />} />
       </Routes>
  </Router>
  );
}

export default App;
