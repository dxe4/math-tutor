import "./App.css";
import TopicPage from "./content/TopicPage";
import { ConfigProvider, theme } from "antd";
import React from "react";
import "./App.css";

function App() {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className="App">
        <TopicPage />
      </div>
    </ConfigProvider>
  );
}

export default App;
