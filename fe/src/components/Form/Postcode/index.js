import React from "react";
import { TextField } from "@material-ui/core";

export default ({ handlePostCodeChange, value, status }) => {
  return (
    <div className="field-wrapper">
      <TextField
        id="outlined-dense"
        margin="dense"
        variant="outlined"
        label="Post code"
        value={value}
        onChange={handlePostCodeChange}
        helperText="Post code must be 4 digits"
      />
    </div>
  );
};
