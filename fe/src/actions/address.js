import { FORM_LOCATION, RESET_FORM_MUNICIPALITY, RESET_FORM_LOCATION, FORM_MUNICIPALITY, API_GET_ADDRESS_BY_POSTCODE, CHANGE_CURRENT, ADD_HISTORY, RESET_HISTORY } from '../constants';
import axios from 'axios';

const getAddressByPostcodeNumber = (number) => (dispatch, getState) => {
    axios.get(`${API_GET_ADDRESS_BY_POSTCODE}/${number}`)
    .then(res => {
        // Creates a new array with each `location`
        // having its own index
        const locationList = res.data.reduce(function (r, a) {
            r[a.location] = r[a.location] || [];
            r[a.location] = { ...a };
            return r;
        }, Object.create(null));

        const locations = Object.keys(locationList)
        console.log('locationss ', locations.length);
        console.log('locationss ', locationList);
        if (locations.length > 1) {
            const data = {
                hasOptions: true,
                options: locations
            }
            dispatch({type: FORM_LOCATION, payload: data})
        }

        if (locations.length === 1) {
            const data = {
                hasOptions: false,
                value: locations[0]
            }
            console.log('>>>>>')
            dispatch({type: FORM_LOCATION, payload: data});
        }
        const defaultLocationState = {
            hasOptions: false,
            value: '',
            options: []
        }

        const municipalityList = res.data.reduce(function (r, a) {
            r[a.municipality_name] = r[a.municipality_name] || [];
            r[a.municipality_name] = { ...a };
            return r;
        }, Object.create(null));
        const municipalities = Object.keys(municipalityList);
        console.log('hey there!!! ', municipalities);
        if (municipalities.length > 1) {
            const data = {
                hasOptions: true,
                options: municipalities
            }
            dispatch({type: FORM_MUNICIPALITY, payload: data})
        }

        if (municipalities.length === 1) {
            const data = {
                hasOptions: false,
                value: municipalities[0]
            }
            dispatch({type: FORM_MUNICIPALITY, payload: data});
        }
        // dispatch({ type: FORM_MUNICIPALITY, payload: })

    })
    .catch((err) => console.log('somethign went wront ', err));
}

const resetLocation = () => (dispatch, getState) => {
    dispatch({type: RESET_FORM_LOCATION})
}

const changeCurrent = (address) => (dispatch, getState) => {
    // In case of I/O calls to dispathc 
    // dispatch({type: CHANGE_CURRENT_LOADING})
    dispatch({type: CHANGE_CURRENT, payload: address})
    addHistory(address, getState, dispatch);
    
}

const addHistory = (address, getState, dispatch) => {
    let  {  history } = getState().address
    history.push(address)
    dispatch({ type: ADD_HISTORY, payload: history });

}

const resetHistory = () => (dispatch, getState) => {
    dispatch({type: RESET_HISTORY})
}

const resetMunicipality = () => (dispatch, getState) => {
    console.log('hey there!!! cxxxxx');
    dispatch({type: RESET_FORM_MUNICIPALITY})
}

export {
    changeCurrent,
    resetHistory,
    getAddressByPostcodeNumber,
    resetLocation,
    resetMunicipality
}