import "./App.css";
import { ConfigProvider, theme } from "antd";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurvePage from "./content/CurvePage";
import BioPage from "./content/BioPage";
import TopicPage from "./content/TopicPage";
import LandingPage from "./content/LandingPage";
import PrimeNumberPage from "./content/PrimeNumberPage";

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/topics" element={<TopicPage />} />
            <Route path="/curves" element={<CurvePage />} />
            <Route path="/bios" element={<BioPage />} />
            <Route path="/primes" element={<PrimeNumberPage />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
