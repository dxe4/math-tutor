import "./App.css";
import TopicPage from "./content/TopicPage";
import LandingPage from "./content/LandingPage";
import { ConfigProvider, theme } from "antd";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/topics" element={<TopicPage />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
