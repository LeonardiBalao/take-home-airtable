import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./data/timelineItems.js";
import HomePage from "./pages/HomePage.js";

function App() {
  return <HomePage timelineItems={timelineItems} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);