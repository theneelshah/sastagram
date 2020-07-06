import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

const Main = styled.div`
  max-width: 60%;
  margin: 75px auto;
  @media only screen and (max-width: 991px) {
    max-width: 80%;
  }
`;

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main>
          <Routes />
        </Main>
      </Router>
    </div>
  );
};

export default App;
