import React from "react";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel
} from "react-bootstrap";

export default ({ handlePostCodeChange, value, status }) => {
  return (
    <FormGroup controlId="postCode" validationState={status}>
      <ControlLabel>Post code</ControlLabel>
      <FormControl type="text" value={value} onChange={handlePostCodeChange} />
      <FormControl.Feedback />
      <HelpBlock>Postcode must be 4 digits</HelpBlock>
    </FormGroup>
  );
};
