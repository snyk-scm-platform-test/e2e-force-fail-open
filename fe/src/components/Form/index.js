import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Col,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Button
} from "react-bootstrap";
import { DotLoader } from "react-spinners";
import {
  changeCurrent,
  getAddressByPostcodeNumber,
  resetMunicipality,
  resetLocation,
  resetPostcode,
  resetHistory,
  updateLocation,
  updateMunicipality
} from "../../actions";
import { POSTCODE_MAX_DIGITS } from "../../constants";
import Postcode from "./Postcode";
import Location from "./Location";
import Municipality from "./Municipality";

class FormExample extends Component {
  handlePostCodeChange = e => {
    const postcodeNumber = e.target.value;
    const {
      getAddressByPostcodeNumber,
      resetLocation,
      resetMunicipality,
      resetPostcode
    } = this.props;
    let status = null;
    if (postcodeNumber.length !== POSTCODE_MAX_DIGITS || isNaN(postcodeNumber))
      status = "error";
    if (
      postcodeNumber.length === POSTCODE_MAX_DIGITS &&
      !isNaN(postcodeNumber)
    ) {
      status = "success";
      getAddressByPostcodeNumber(postcodeNumber);
    } else {
      resetPostcode();
      resetLocation();
      resetMunicipality();
    }
  };

  handleLocationChange = e => {
    const { value } = e.target;
    this.props.updateLocation(value);
  };
  handleLocationOnInputChange = valueList =>
    this.props.updateLocation(valueList[0]);

  handleMunicipalityOnInputChange = valueList =>
    this.props.updateMunicipality(valueList[0]);

  handleMunicipalityChange = e => {
    console.log("munic changing!!!");
    const { value } = e.target;
    // this.setState({ municipality: { value } });
    this.props.updateMunicipality(value);
  };

  handleButtonClick = () => {
    const { postCode, location, municipality } = this.props;
    // this.props.getLatAndLng(postCode)
  };

  render() {
    const {
      postCode,
      location,
      municipality,
      hasAllFieldsBeenFilled
    } = this.props;

    // console.log("xinu li status? ", this.props);
    // console.log("the props ", this.props);
    return (
      <Col md={4}>
        <form>
          <Postcode
            {...postCode}
            handlePostCodeChange={this.handlePostCodeChange}
          />
          <Location
            {...location}
            onInputChange={this.handleLocationOnInputChange}
            onChange={this.handleLocationChange}
          />
          <Municipality
            {...municipality}
            handleMonInputChange={this.handleMunicipalityOnInputChange}
            handleMunicipalityChange={this.handleMunicipalityChange}
          />
          <Button
            className={`btn btn-success ${
              hasAllFieldsBeenFilled ? "" : "disabled"
            }`}
            onClick={this.handleButtonClick}
          >
            Proceed
          </Button>
        </form>
      </Col>
    );
  }
}

const mapDisptchToProps = {
  changeCurrent,
  getAddressByPostcodeNumber,
  resetLocation,
  resetMunicipality,
  resetPostcode,
  updateMunicipality,
  updateLocation
};

const mapStateToProps = state => {
  const {
    form: { location, municipality }
  } = state;
  console.log(".???.", location.value, municipality.value);
  return {
    location: location,
    municipality: municipality,
    hasAllFieldsBeenFilled:
      Boolean(location.value.length) && Boolean(municipality.value.length)
  };
};

export default connect(
  mapStateToProps,
  mapDisptchToProps
)(FormExample);
