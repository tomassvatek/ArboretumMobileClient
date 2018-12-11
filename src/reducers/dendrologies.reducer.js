import { FETCH_DENDROLOGIES } from "../actions/redux-action-types";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DENDROLOGIES:
            return action.payload;
        default:
            return state;
    }
}