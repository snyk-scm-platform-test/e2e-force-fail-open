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
  resetLocation
} from "../../actions";
import Postcode from "./Postcode";
import Location from "./Location";
import Municipality from "./Municipality";

class FormExample extends Component {
  state = {
    postCode: {
      value: "",
      status: null
    },
    location: {},
    municipality: {}
  };

  componentDidUpdate(prev, next) {
    // to do next
    if (prev.location !== this.props.location) {
      this.setState({ location: this.props.location });
    }
    if (prev.municipality !== this.props.municipality) {
      this.setState({ municipality: this.props.municipality });
    }
  }

  handlePostCodeChange = e => {
    const postcodeNumber = e.target.value;
    const {
      getAddressByPostcodeNumber,
      resetLocation,
      resetMunicipality
    } = this.props;
    let status = null;
    if (postcodeNumber.length !== 4 || isNaN(postcodeNumber)) status = "error";
    if (postcodeNumber.length === 4 && !isNaN(postcodeNumber)) {
      status = "success";
      getAddressByPostcodeNumber(postcodeNumber);
    } else {
      resetLocation();
      resetMunicipality();
    }
    this.setState({ postCode: { value: postcodeNumber, status } });
  };

  handleLocationChange = e =>
    this.setState({ location: { value: e.target.value } });

  handleButtonClick = () => {
    const { postCode, location, municipality } = this.state;
    // this.props.getLatAndLng(postCode)
  };

  handleMunicipalityChange = e =>
    this.setState({ municipality: { value: e.target.value } });

  render() {
    const { postCode, location, municipality } = this.state;
    console.log("xinu li status? ", this.state);
    console.log("the props ", this.props);
    return (
      <Col md={4}>
        <form>
          <Postcode
            {...postCode}
            handlePostCodeChange={this.handlePostCodeChange}
          />
          <Location
            {...location}
            handleLocationChange={this.handleLocationChange}
          />
          <Municipality
            {...municipality}
            handleMunicipalityChange={this.handleMunicipalityChange}
          />
          <Button className="btn btn-success" onClick={this.handleButtonClick}>
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
  resetMunicipality
};

const mapStateToProps = state => {
  return {
    location: state.form.location,
    municipality: state.form.municipality
  };
};

export default connect(
  mapStateToProps,
  mapDisptchToProps
)(FormExample);
