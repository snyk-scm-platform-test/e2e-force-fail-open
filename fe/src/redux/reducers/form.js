import {
  FORM_LOCATION,
  FORM_MUNICIPALITY,
  FORM_POSTCODE,
  RESET_FORM_LOCATION,
  RESET_FORM_MUNICIPALITY,
  RESET_FORM_POSTCODE
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
    case FORM_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case RESET_FORM_MUNICIPALITY:
      return {
        ...state,
        municipality: commonDefaultState
      };
    case RESET_FORM_LOCATION:
      return {
        ...state,
        location: commonDefaultState
      };
    case RESET_FORM_POSTCODE:
      return {
        ...state,
        postcode: null
      };
    default:
      return state;
  }
}
