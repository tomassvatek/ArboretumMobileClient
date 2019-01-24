import { CONNECTION_STATUS_CHANGE } from "../actions/const/redux-action-types";



export default function(state = false, action) {
    switch(action.type) {
        case CONNECTION_STATUS_CHANGE:
            return action.payload;
        default:
            return state;
    }
}