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
    if (
      postcodeNumber.length === POSTCODE_MAX_DIGITS &&
      !isNaN(postcodeNumber)
    ) {
      postCodeStatus = "success";
      getAddressByPostcodeNumber(postcodeNumber);
    } else {
      postCodeStatus = "error";
      resetPostcode();
      resetLocation();
      resetMunicipality();
    }
    this.setState({ postCodeStatus });
  };

  handleLocationChange = valueList => {
    if (valueList.length) {
      this.props.updateLocation(valueList[0] || "");
    }
  };

  handleLocationOnInputChange = e => {
    if (e.target) {
      this.props.updateLocation(e.target.value);
    }
  };

  handleMunicipalityOnInputChange = e => {
    if (e.target) {
      this.props.updateLocation(e.target.value);
    }
  };

  handleMunicipalityChange = valueList => {
    if (valueList.length) {
      this.props.updateMunicipality(valueList[0] || "");
    }
  };

  handleButtonClick = () => {
    const { changedCurrentAddress, isFormValid } = this.props;
    if (isFormValid) changedCurrentAddress();
  };

  render() {
    const { postCode, location, municipality, isFormValid } = this.props;
    const { postCodeStatus } = this.state;
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
            onInputChange={this.handleMunicipalityOnInputChange}
            onChange={this.handleMunicipalityChange}
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
