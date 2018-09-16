import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DotLoader } from "react-spinners";

export default ({ value, options, isLoading, onChange, onInputChange }) => {
  return (
    <FormGroup controlId="location">
      <ControlLabel>
        Location {isLoading && <DotLoader size={15} />}
      </ControlLabel>
      <Typeahead
        selected={[value]}
        disabled={isLoading}
        onChange={onChange}
        onInputChange={onInputChange}
        options={options || []}
      />
      <FormControl.Feedback />
    </FormGroup>
  );
};
