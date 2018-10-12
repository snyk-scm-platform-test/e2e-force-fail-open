import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DotLoader } from "react-spinners";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

export default ({ value, options, isLoading, onChange, onInputChange }) => {
  console.log("xhem hazin? ", value);
  const isSelectNeeded = {
    select: options.length > 1 ? true : false
  };
  return (
    <TextField
      id="filled-select-currency"
      select
      {...isSelectNeeded}
      label="Municipality"
      value={value}
      onChange={onInputChange}
      margin="normal"
      variant="outlined"
    >
      {options.length > 1 &&
        options.map((o, i) => (
          <MenuItem key={o + i} value={o}>
            {o}
          </MenuItem>
        ))}
    </TextField>
  );
};
