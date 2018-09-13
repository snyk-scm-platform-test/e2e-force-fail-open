import React, { Component } from "react";
import { Row } from "react-bootstrap";
import "../App.css";
import Form from "./Form/index";
import Map from "./Map/index";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Row style={{ margin: "30px 0 40px" }}>
          <Form />
          <Map />
        </Row>
      </div>
    );
  }
}

export default App;
