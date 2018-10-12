import React from "react";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel
} from "react-bootstrap";
import { TextField } from "@material-ui/core";

export default ({ handlePostCodeChange, value, status }) => {
  return (
    <TextField
      id="outlined-dense"
      margin="dense"
      variant="outlined"
      label="Post code"
      value={value}
      onChange={handlePostCodeChange}
      helperText="Post code must be 4 digits"
    />
  );
};
