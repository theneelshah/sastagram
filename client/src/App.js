import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ maxWidth: "60%", margin: "75px auto" }}>
          <Routes />
        </div>
      </Router>
    </div>
  );
};

export default App;
