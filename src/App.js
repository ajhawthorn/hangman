import React, { useState } from "react";

import Header from "./components/Header.js";
import Figures from "./components/Figures.js";
import WrongLetters from "./components/WrongLetters.js";
import Answer from "./components/Answer.js";
import Help from "./components/Help.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App">
      <Header />
      <Container fluid>
        <Row>
          <Col>
            <Answer />
            <WrongLetters />
            <Help />
            <Figures />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
