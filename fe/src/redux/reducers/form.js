import {
  FORM_LOCATION,
  RESET_FORM_LOCATION,
  FORM_MUNICIPALITY,
  RESET_FORM_MUNICIPALITY
} from "../../constants";
import commonDefaultState from "../commonDefaultState";

const initialState = {
  municipality: {
    ...commonDefaultState
  },
  location: {
    ...commonDefaultState
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FORM_MUNICIPALITY:
      return {
        ...state,
        municipality: action.payload
      };
      break;
    case FORM_LOCATION:
      console.log("reaching here ", action.payload);
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
      console.log("resetting location");
      return {
        ...state,
        location: commonDefaultState
      };
      break;
    default:
      return state;
  }
}
