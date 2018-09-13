import React, { Component } from "react";
import { Col } from "react-bootstrap";
import diff from "lodash/difference";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { DotLoader } from "react-spinners";
import { connect } from "react-redux";
import { getLatAndLng } from "../../actions";
import { deepDiff } from "../../util";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.cordinates.lat, lng: props.cordinates.lng }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: props.cordinates.lat, lng: props.cordinates.lng }}
        />
      )}
    </GoogleMap>
  ))
);

class Map extends Component {
  state = {
    lat: 0,
    lng: 9,
    isVisible: false
  };
  componentDidUpdate(prevProps) {
    const prevPropsDiff = deepDiff(
      prevProps.currentAddress,
      this.props.currentAddress
    );
    // Omitting isLoading
    const { isLoading, ...propsDiffWithoutIsLoading } = prevPropsDiff;
    if (!!Object.getOwnPropertyNames(propsDiffWithoutIsLoading).length) {
      const { currentAddress, getLatAndLng } = this.props;
      const { postCode, location, municipality, lat, lng } = currentAddress;
      const address = `${postCode} ${location} ${municipality}`;
      getLatAndLng(address);
      this.setState({ isVisible: true });
    }
  }
  render() {
    const { isVisible } = this.state;
    const {
      currentAddress: { lat, lng, isLoading }
    } = this.props;

    if (!isVisible) return null;
    return (
      <Col md={7} mdOffset={1}>
        <MyMapComponent
          cordinates={{ lat, lng }}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return { currentAddress: state.currentAddress };
};

const mapDispatchToProps = {
  getLatAndLng
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
