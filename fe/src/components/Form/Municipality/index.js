import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import { DotLoader } from "react-spinners";
export default ({ value, options, isLoading, onChange, onInputChange }) => {
  const isSelectNeeded = {
    select: options.length > 1 ? true : false
  };
  return (
    <div className="field-wrapper">
      <TextField
        id="filled-select-currency"
        select
        {...isSelectNeeded}
        label="Municipality"
        value={value}
        onChange={onInputChange}
        margin="normal"
        variant="outlined"
        className={isLoading ? "disabled" : ""}
      >
        {options.length > 1 &&
          options.map((o, i) => (
            <MenuItem key={o + i} value={o}>
              {o}
            </MenuItem>
          ))}
      </TextField>
      {isLoading && (
        <span className="spinner">
          <DotLoader size={15} />
        </span>
      )}
    </div>
  );
};
