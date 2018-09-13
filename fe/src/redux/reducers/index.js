import { combineReducers } from "redux";
import currentAddress from "./currentAddress";
import form from "./form";

export default combineReducers({
  currentAddress,
  form
});
