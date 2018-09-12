import { FORM_LOCATION,RESET_FORM_LOCATION, FORM_MUNICIPALITY, RESET_FORM_MUNICIPALITY } from '../../constants'

const initialState = {
    municipality: {
        hasOptions: false,
        value: '',
        options: []
    },
    location: {
        hasOptions: false,
        value: '',
        options: []
    }
}
export default function(state = initialState, action) {
    switch(action.type) {
        case FORM_MUNICIPALITY:
            return {
                ...state,
                municipality: action.payload
            }
            break;
        case FORM_LOCATION:
            console.log('reaching here ', action.payload);
            return {
                ...state,
                location: action.payload
            }
            break;
        case RESET_FORM_MUNICIPALITY:
            return {
                ...state,
                municipality: initialState.municipality
            }
            break;
        case RESET_FORM_LOCATION: 
            console.log('resetting location')
            return {
                ...state,
                location: initialState.location
            }
            break;
        default:
            return state;
    }
}