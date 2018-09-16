import axios from "axios";
import {
  FORM_LOCATION,
  RESET_FORM_MUNICIPALITY,
  RESET_FORM_LOCATION,
  FORM_MUNICIPALITY,
  API_GET_ADDRESS_BY_POSTCODE,
  CHANGE_CURRENT_ADDRESS,
  FORM_POSTCODE,
  RESET_FORM_POSTCODE
} from "../constants";
import commonDefaultState from "../redux/commonDefaultState";
import { processApiData } from "../util";

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
      const API_RESPONSE_KEY_MUNICIPALITY = "municipality_name";
      const API_RESPONSE_KEY_LOCATION = "location";
      dispatch({
        type: FORM_LOCATION,
        payload: {
          isLoading: false,
          value: processApiData(res.data, API_RESPONSE_KEY_LOCATION)
        }
      });

      dispatch({
        type: FORM_MUNICIPALITY,
        payload: {
          isLoading: false,
          value: processApiData(res.data, API_RESPONSE_KEY_MUNICIPALITY)
        }
      });

      dispatch({ type: FORM_POSTCODE, payload: number });
    })
    .catch(err => console.log("somethign went wront ", err));
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
