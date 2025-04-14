import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import PersonalTest from "./pages/PersonalTest";
import Layout from "./components/Layout"; // Layout for pages with Header & Footer
import SimpleLayout from "./components/SimpleLayout"; // Layout without Header & Footer (for PersonalTest)
import AboutUs from "./pages/aboutus";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route with Header & Footer */}
        <Route path='/' element={<Layout><GetStarted /></Layout>} />
        <Route path='/about' element={<Layout><AboutUs /></Layout>} />
        
        {/* Route without Header & Footer */}
        <Route path='/personal-test' element={<SimpleLayout><PersonalTest /></SimpleLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
