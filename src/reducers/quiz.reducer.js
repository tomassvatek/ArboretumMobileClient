import { FETCH_QUIZ_TREES } from "../actions/redux-action-types";

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_QUIZ_TREES:
            console.log("Fetch quiz:");
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}