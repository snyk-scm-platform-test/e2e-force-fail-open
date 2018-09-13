import { CHANGE_CURRENT } from "../../constants";

const initialState = {
  postCode: "",
  location: "",
  municipality: "",
  lat: "",
  lng: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT:
      return {
        ...state,
        ...action.payload
      };
      break;
    default:
      return state;
  }
}
