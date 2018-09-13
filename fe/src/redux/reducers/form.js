import {
  FORM_LOCATION,
  FORM_MUNICIPALITY,
  FORM_POSTCODE,
  RESET_FORM_LOCATION,
  RESET_FORM_MUNICIPALITY,
  RESET_FORM_POSTCODE,
  FORM_MUNICIPALITY_LOADING,
  FORM_LOCATION_LOADING
} from "../../constants";
import commonDefaultState from "../commonDefaultState";

const initialState = {
  postcode: null,
  municipality: {
    ...commonDefaultState
  },
  location: {
    ...commonDefaultState
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FORM_POSTCODE:
      return {
        ...state,
        postcode: action.payload
      };
    case FORM_MUNICIPALITY:
      return {
        ...state,
        municipality: action.payload
      };
      break;
    case FORM_LOCATION:
      return {
        ...state,
        location: action.payload
      };
      break;
    case RESET_FORM_MUNICIPALITY:
      return {
        ...state,
        municipality: commonDefaultState
      };
      break;
    case RESET_FORM_LOCATION:
      return {
        ...state,
        location: commonDefaultState
      };
      break;
    case RESET_FORM_POSTCODE:
      return {
        ...state,
        postcode: null
      };
      break;
    default:
      return state;
  }
}
