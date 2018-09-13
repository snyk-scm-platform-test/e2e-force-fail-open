import React, { Component } from "react";
import { Col } from "react-bootstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { connect } from "react-redux";
import { getLatAndLng } from "../../actions";
import { deepDiff } from "../../util";
import { GOOGLE_MAP_URL } from "../../constants";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ ...props.cordinates }}>
      {props.isMarkerShown && <Marker position={{ ...props.cordinates }} />}
    </GoogleMap>
  ))
);

class Map extends Component {
  state = {
    isVisible: false
  };
  componentDidUpdate(prevProps) {
    const prevPropsDiff = deepDiff(
      prevProps.currentAddress,
      this.props.currentAddress
    );

    if (!!Object.getOwnPropertyNames(prevPropsDiff).length) {
      const { currentAddress, getLatAndLng } = this.props;
      const { postCode, location, municipality } = currentAddress;
      const address = `${postCode} ${location} ${municipality}`;
      getLatAndLng(address);
      this.setState({ isVisible: true });
    }
  }
  render() {
    const { isVisible } = this.state;
    const {
      currentAddress: { lat, lng }
    } = this.props;

    if (!isVisible) return null;
    return (
      <Col md={7} mdOffset={1}>
        <MyMapComponent
          cordinates={{ lat, lng }}
          isMarkerShown
          googleMapURL={GOOGLE_MAP_URL}
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
