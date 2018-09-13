import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import "../App.css";
import Form from "./Form/index";
import Map from "./Map/index";

class App extends Component {
  render() {
    const { current } = this.props.address;
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

const mapStateToProps = state => {
  return { ...state };
};

export default connect(
  mapStateToProps,
  null
)(App);
