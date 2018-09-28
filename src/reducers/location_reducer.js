import {
    USER_LOCATION_CHANGE_SUCCESS,
    USER_LOCATION_CHANGE_FAILURE
} from '../actions/types';

export default function (state = {}, action) {
    switch(action.type) {
        case USER_LOCATION_CHANGE_SUCCESS:
            return {location: action.payload};
        case USER_LOCATION_CHANGE_FAILURE:
            return {errorMessage: action.payload};
        default:
            return state;
    }
}