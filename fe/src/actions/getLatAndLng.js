import { GEO_CODE_API_KEY, CHANGE_CURRENT_ADDRESS } from "../constants";
import Geocode from "react-geocode";

export default address => (dispatch, getState) => {
  Geocode.setApiKey(GEO_CODE_API_KEY);
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      dispatch({
        type: CHANGE_CURRENT_ADDRESS,
        payload: { ...getState().currentAddress, lat, lng }
      });
    },
    error => {
      console.error(error);
    }
  );
};
