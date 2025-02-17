const config = {
  API_HOST: process.env.REACT_APP_API_HOST || "http://localhost:8000",
  WS_URL: process.env.REACT_APP_WS_URL || "ws://localhost:8000/ws",
};

export default config;
