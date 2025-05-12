import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Layout from "./components/Layout";
import SimpleLayout from "./components/SimpleLayout";
import GetStarted from "./pages/GetStarted";
import AboutUs from "./pages/AboutUs";
import PersonalTest from "./pages/PersonalTest";
import Result from "./pages/Result";
import MediaWebsites from "./pages/MediaWebsites";
import CandidateProfile from "./pages/CandidateProfile";
import ErrorBoundary from "./components/ErrorBoundary";

import { Routes, Route, useLocation } from "react-router-dom";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <GetStarted />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/political-test"
          element={
            <SimpleLayout>
              <PersonalTest />
            </SimpleLayout>
          }
        />
        <Route
          path="/result"
          element={
            <Layout>
              <ErrorBoundary>
                <Result />
              </ErrorBoundary>
            </Layout>
          }
        />
        <Route
          path="/news-sites"
          element={
            <Layout>
              <MediaWebsites />
            </Layout>
          }
        />
        <Route path="/candidate/:slug" element={<CandidateProfile />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
