import React from "react";
import { Col } from "react-bootstrap";
export default ({ current, history = [] }) => {
  return (
    <Col md={5} mdOffset={2}>
      <div>Last submmited address: {current} </div>
      {Boolean(history.length) && <div> History: </div>}
      {history.map(h => (
        <div key={h}> {h} </div>
      ))}
    </Col>
  );
};
