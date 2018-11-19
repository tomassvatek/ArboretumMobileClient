import { FETCH_TREES } from "../actions/types";

const INITIAL_STATE = [
]

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_TREES:
            return action.payload;
        default:
            return state;
    }
}