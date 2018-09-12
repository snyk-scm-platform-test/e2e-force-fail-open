import { CHANGE_CURRENT, ADD_HISTORY, RESET_HISTORY } from '../../constants'

const initialState = {
    current: 'No addresses submitted.',
    history: []
}
export default function(state = initialState, action) {
    switch(action.type) {
        case CHANGE_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case ADD_HISTORY:
            return {
                ...state,
                history:  action.payload
            } 
        case RESET_HISTORY:
            return {
                current: '',
                history: []
            }
        default:
            return state;
    }
}