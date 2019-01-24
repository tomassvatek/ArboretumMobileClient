import { FETCH_DENDROLOGIES } from "../actions/const/redux-action-types";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_DENDROLOGIES:
            return action.payload;
        default:
            return state;
    }
}