import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DotLoader } from "react-spinners";

export default ({
  hasOptions,
  value,
  options,
  isLoading,
  onChange,
  onInputChange
}) => {
  return (
    <FormGroup controlId="location">
      <ControlLabel>
        Location {isLoading && <DotLoader size={15} />}
      </ControlLabel>
      {hasOptions ? (
        <Typeahead
          disabled={isLoading}
          onChange={onInputChange}
          options={options || []}
        />
      ) : (
        <FormControl
          disabled={isLoading}
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
      <FormControl.Feedback />
    </FormGroup>
  );
};
