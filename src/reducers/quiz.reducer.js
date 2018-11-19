import { FETCH_QUIZ_TREES } from "../actions/types";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_QUIZ_TREES:
            return action.payload;
        default:
            return state;
    }
}