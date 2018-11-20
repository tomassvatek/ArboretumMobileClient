import { REGION_CHANGE } from "../actions/types";

const INTIAL_STATE = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
}

export default function(state = INTIAL_STATE, action) {
    switch(action.type) {
        case REGION_CHANGE:
            return action.payload;
        default:
            return state;
    }
}