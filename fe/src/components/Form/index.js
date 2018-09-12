import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Col, FormGroup, FormControl, HelpBlock, ControlLabel, Button} from 'react-bootstrap';
import { BounceLoader } from 'react-spinners';
import { changeCurrent, getAddressByPostcodeNumber,resetMunicipality, resetLocation } from '../../actions';
import {Typeahead} from 'react-bootstrap-typeahead';

class FormExample extends Component {
    state = {
        postCode: {
            value: '',
            status: null
        },
        location: {

        },
        municipality: {
     
        }
    };

    componentDidUpdate(prev, next) {
      // to do next
      if ( prev.location !== this.props.location) {
        this.setState({ location: this.props.location })
      }
      if (prev.municipality !== this.props.municipality) {
        this.setState({ municipality: this.props.municipality })
      }
    }

    handlePostCodeChange = (e) => {
        const postcodeNumber = e.target.value;
        const { getAddressByPostcodeNumber, resetLocation, resetMunicipality } = this.props;
        let status = null;
        if (postcodeNumber.length !== 4 || isNaN(postcodeNumber)) status = 'error';
        if (postcodeNumber.length === 4 && !isNaN(postcodeNumber)) {
          status = 'success';
          getAddressByPostcodeNumber(postcodeNumber)
        } else {
          resetLocation();
          resetMunicipality();
        }
        this.setState({ postCode: { value: postcodeNumber , status } })
    } 

    handleLocationChange = (e) => {
        this.setState({ location: { value: e.target.value  }});        
    }

    handleButtonClick = () => {
      const { postCode, location, municipality } = this.state;
      // this.props.getLatAndLng(postCode)
    };

    handleMunicipalityChange = (e) => {
      this.setState({ municipality: { value: e.target.value  }});        
    }

    renderLocation = () => {
      const { location } = this.state;
      const { hasOptions, value, options } = this.props.location
      console.log('loc value isss ...', value, location.value)
      return (
        <FormGroup
          controlId="location"
          validationState={location.status}
      >
        <ControlLabel>Location <BounceLoader size={15} /></ControlLabel>
          { hasOptions ? <Typeahead
                          disabled={false}
                          options={options || []}
                        />
                      : 
                      <FormControl
                        type="text"
                        value={location.value}
                        onChange={this.handleLocationChange}
                    />

          }
        <FormControl.Feedback />
      </FormGroup>
      )
    }

    renderMunicipality = () => {
      const { municipality } = this.state;
      const { hasOptions, value, options } = this.props.municipality
      return (
          <FormGroup
        controlId="municipality"
        validationState={municipality.status}
      >
        <ControlLabel>Municipality <BounceLoader size={15} /></ControlLabel>
          { hasOptions ? <Typeahead
                          disabled={false}
                          options={options || []}
                        />
                      : 
                      <FormControl
                        type="text"
                        value={municipality.value}
                        onChange={this.handleMunicipalityChange}
                    />

          }
        <FormControl.Feedback />
      </FormGroup>
      )
    }
  
    render() {
        const { postCode, location, municipality } = this.state;
        const municipalityValue = municipality.value;
        console.log('xinu li status? ', this.state)
        console.log('the props ', this.props);
      return (
          <Col md={5}>
        <form>
          <FormGroup
            controlId="postCode"
            validationState={this.state.postCode.status}
          >
            <ControlLabel>Post code <BounceLoader size={15} /></ControlLabel>
            <FormControl
              type="text"
              value={postCode.value}
              placeholder="Enter text"
              onChange={this.handlePostCodeChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Postcode must be 4 digits</HelpBlock>
          </FormGroup>
          {this.renderLocation()}
          {this.renderMunicipality()}
            <Button className="btn btn-success" onClick={this.handleButtonClick} >  Proceed </Button>
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
  }
 
  const mapStateToProps = (state) => {
    return {
      location:  state.form.location,
      municipality: state.form.municipality
    }
  }

  export default connect(mapStateToProps, mapDisptchToProps)(FormExample);