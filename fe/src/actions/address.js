import axios from "axios";
import {
  FORM_LOCATION,
  RESET_FORM_MUNICIPALITY,
  RESET_FORM_LOCATION,
  FORM_MUNICIPALITY,
  API_GET_ADDRESS_BY_POSTCODE,
  CHANGE_CURRENT_ADDRESS,
  FORM_POSTCODE,
  RESET_FORM_POSTCODE,
  FORM_LOCATION_LOADING,
  FORM_MUNICIPALITY_LOADING
} from "../constants";
import commonDefaultState from "../redux/commonDefaultState";

export const getAddressByPostcodeNumber = number => (dispatch, getState) => {
  dispatch({
    type: FORM_LOCATION,
    payload: { ...getState().form.location, isLoading: true }
  });
  dispatch({
    type: FORM_MUNICIPALITY,
    payload: { ...getState().form.municipality, isLoading: true }
  });
  axios
    .get(`${API_GET_ADDRESS_BY_POSTCODE}/${number}`)
    .then(res => {
      processLocation(res.data, dispatch);
      processMunicipality(res.data, dispatch);
      updatePostcode(number, dispatch);
    })
    .catch(err => console.log("somethign went wront ", err));
};

const updatePostcode = (number, dispatch) => {
  dispatch({ type: FORM_POSTCODE, payload: number });
};

export const updateLocation = name => (dispatch, getState) => {
  dispatch({
    type: FORM_LOCATION,
    payload: { ...getState().form.location, value: name }
  });
};

export const updateMunicipality = name => (dispatch, getState) => {
  dispatch({
    type: FORM_MUNICIPALITY,
    payload: { ...getState().form.municipality, value: name }
  });
};

// processMunicipality & processLocation could be refactored.
// Both functions shares identical logic
const processMunicipality = (data, dispatch) => {
  // Gathers unique values in specific key (`location`) and creates
  // an array of them.
  const municipalityList = data.reduce(function(r, a) {
    r[a.municipality_name] = r[a.municipality_name] || [];
    r[a.municipality_name] = { ...a };
    return r;
  }, Object.create(null));
  const municipalities = Object.keys(municipalityList);
  if (municipalities.length > 1) {
    const data = {
      hasOptions: true,
      options: municipalities,
      isLoading: false,
      value: ""
    };
    dispatch({ type: FORM_MUNICIPALITY, payload: data });
  }

  if (municipalities.length === 1) {
    const data = {
      hasOptions: false,
      value: municipalities[0],
      isLoading: false
    };
    dispatch({ type: FORM_MUNICIPALITY, payload: data });
  }
  if (municipalities.length === 0) {
    dispatch({ type: FORM_MUNICIPALITY, payload: commonDefaultState });
  }
};
const processLocation = (data, dispatch) => {
  const locationList = data.reduce(function(r, a) {
    r[a.location] = r[a.location] || [];
    r[a.location] = { ...a };
    return r;
  }, Object.create(null));

  const locations = Object.keys(locationList);
  if (locations.length > 1) {
    const data = {
      hasOptions: true,
      options: locations,
      isLoading: false,
      value: ""
    };
    dispatch({ type: FORM_LOCATION, payload: data });
  }
  if (locations.length === 1) {
    const data = {
      hasOptions: false,
      value: locations[0],
      isLoading: false
    };
    dispatch({ type: FORM_LOCATION, payload: data });
  }

  if (locations.length === 0) {
    dispatch({ type: FORM_LOCATION, payload: commonDefaultState });
  }
};

export const resetLocation = () => (dispatch, getState) => {
  dispatch({ type: RESET_FORM_LOCATION });
};

export const changedCurrentAddress = address => (dispatch, getState) => {
  const currentAddress = {
    postCode: getState().form.postcode,
    location: getState().form.location.value,
    municipality: getState().form.municipality.value
  };
  dispatch({ type: CHANGE_CURRENT_ADDRESS, payload: currentAddress });
};

export const resetMunicipality = () => (dispatch, getState) =>
  dispatch({ type: RESET_FORM_MUNICIPALITY });

export const resetPostcode = () => (dispatch, getState) =>
  dispatch({ type: RESET_FORM_POSTCODE, payload: "" });
