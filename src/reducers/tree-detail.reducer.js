import { FETCH_TREE_DETAIL } from "../actions/const/redux-action-types";

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_TREE_DETAIL:
            return action.payload;
        default:
            return state;
    }
}