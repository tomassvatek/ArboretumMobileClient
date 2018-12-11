import {
    USER_LOCATION_CHANGE_SUCCESS,
    USER_LOCATION_CHANGE_FAILURE
} from '../actions/redux-action-types';

INITIAL_STATE = {
    currentLocation: {
        latitude: 0,
        longitude: 0
    },
    currentRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0182,
        longitudeDelta: 0.0182
    },
    isLocationEnable: false
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOCATION_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                currentLocation: action.payload,
                currentRegion: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    latitudeDelta: 0.0182,
                    longitudeDelta: 0.0182
                },
                isLocationEnable: true
            })
        case USER_LOCATION_CHANGE_FAILURE:
            return Object.assign({}, state, {
                isLocationEnable: false
            })
        default:
            return state;
    }
}