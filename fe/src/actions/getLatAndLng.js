
import { GEO_CODE_API_KEY } from '../constants';
import Geocode from "react-geocode";

export default (address) => {
    Geocode.setApiKey(GEO_CODE_API_KEY);
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    )
}