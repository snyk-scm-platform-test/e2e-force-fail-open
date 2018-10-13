import React from "react";
import { DotLoader } from "react-spinners";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";

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
        label="Location"
        value={value}
        onChange={onInputChange}
        margin="normal"
        variant="outlined"
        className={isLoading ? "disabled" : ""}
      >
        {options.length > 1 &&
          options.map((o, i) => (
            <MenuItem key={o + i} value={o}>
              {o || "hey"}
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
