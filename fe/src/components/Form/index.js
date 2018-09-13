import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Button } from "react-bootstrap";
import {
  changedCurrentAddress,
  getAddressByPostcodeNumber,
  resetMunicipality,
  resetLocation,
  resetPostcode,
  updateLocation,
  updateMunicipality
} from "../../actions";
import { POSTCODE_MAX_DIGITS } from "../../constants";
import Postcode from "./Postcode";
import Location from "./Location";
import Municipality from "./Municipality";

class FormExample extends Component {
  state = {
    postCodeStatus: null
  };
  handlePostCodeChange = e => {
    const postcodeNumber = e.target.value;
    const {
      getAddressByPostcodeNumber,
      resetLocation,
      resetMunicipality,
      resetPostcode
    } = this.props;
    let postCodeStatus = null;
    if (postcodeNumber.length !== POSTCODE_MAX_DIGITS || isNaN(postcodeNumber))
      postCodeStatus = "error";
    this.setState({ postCodeStatus });
    if (
      postcodeNumber.length === POSTCODE_MAX_DIGITS &&
      !isNaN(postcodeNumber)
    ) {
      postCodeStatus = "success";
      this.setState({ postCodeStatus });
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
    this.props.updateLocation(valueList[0] || "");

  handleMunicipalityOnInputChange = valueList =>
    this.props.updateMunicipality(valueList[0] || "");

  handleMunicipalityChange = e => {
    console.log("munic changing!!!");
    const { value } = e.target;
    // this.setState({ municipality: { value } });
    this.props.updateMunicipality(value);
  };

  handleButtonClick = () => {
    const { changedCurrentAddress, isFormValid } = this.props;
    if (isFormValid) changedCurrentAddress();
  };

  render() {
    const { postCode, location, municipality, isFormValid } = this.props;
    const { postCodeStatus } = this.state;
    // console.log("xinu li status? ", this.props);
    // console.log("the props ", this.props);
    return (
      <Col md={4}>
        <form>
          <Postcode
            status={postCodeStatus}
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
            className={`btn btn-success ${isFormValid ? "" : "disabled"}`}
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
  changedCurrentAddress,
  getAddressByPostcodeNumber,
  resetLocation,
  resetMunicipality,
  resetPostcode,
  updateMunicipality,
  updateLocation
};

const mapStateToProps = state => {
  const {
    form: { location, municipality, postcode }
  } = state;
  return {
    location: location,
    municipality: municipality,
    isFormValid:
      Boolean(postcode) &&
      Boolean(location.value.length) &&
      Boolean(municipality.value.length)
  };
};

export default connect(
  mapStateToProps,
  mapDisptchToProps
)(FormExample);
