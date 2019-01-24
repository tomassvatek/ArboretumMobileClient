import {
    USER_LOCATION_CHANGE_SUCCESS,
    USER_LOCATION_CHANGE_FAILURE,
    REGION_CHANGE
} from '../actions/const/redux-action-types';

INITIAL_STATE = {
    currentLocation: {
        latitude: 0,
        longitude: 0
    },
    currentRegion: {
        latitude: 50.34029843372689,
        longitude: 14.983717761933804,
        latitudeDelta: 4.314935408862297,
        longitudeDelta: 4.587850123643875
    },
    isLocationEnable: false
}

//TODO: Marker clustering a nacitat data podle zmeny regionu.
export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case USER_LOCATION_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                currentLocation: action.payload,
                isLocationEnable: true
            })
        case REGION_CHANGE:
            return Object.assign({}, state, {
                currentRegion: action.payload
            })
        case USER_LOCATION_CHANGE_FAILURE:
            return Object.assign({}, state, {
                isLocationEnable: false
            })
        default:
            return state;
    }
}