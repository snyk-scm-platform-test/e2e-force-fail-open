import { CHANGE_CURRENT } from "../../constants";

const initialState = {
  current: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
}
