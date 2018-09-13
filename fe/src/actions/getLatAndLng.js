import { GEO_CODE_API_KEY, CHANGE_CURRENT } from "../constants";
import Geocode from "react-geocode";

export default address => (dispatch, getState) => {
  Geocode.setApiKey(GEO_CODE_API_KEY);
  Geocode.fromAddress(address).then(
    response => {
      console.log("inside getlat");
      const { lat, lng } = response.results[0].geometry.location;
      dispatch({
        type: CHANGE_CURRENT,
        payload: { ...getState().currentAddress, lat, lng }
      });
    },
    error => {
      console.error(error);
    }
  );
};
