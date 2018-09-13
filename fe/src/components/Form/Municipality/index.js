import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { DotLoader } from "react-spinners";

export default ({
  hasOptions,
  value,
  options,
  isLoading,
  handleMunicipalityChange,
  handleMonInputChange
}) => {
  return (
    <FormGroup controlId="municipality">
      <ControlLabel>
        Municipality {isLoading && <DotLoader size={15} />}
      </ControlLabel>
      {hasOptions ? (
        <Typeahead
          disabled={isLoading}
          onChange={handleMonInputChange}
          options={options || []}
        />
      ) : (
        <FormControl
          disabled={isLoading}
          type="text"
          value={value}
          onChange={handleMunicipalityChange}
        />
      )}
      <FormControl.Feedback />
    </FormGroup>
  );
};
