import { FETCH_DENDROLOGIES } from "../actions/types";

const INITIAL_STATE = [
]

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_DENDROLOGIES:
            return action.payload;
        default:
            return state;
    }
}