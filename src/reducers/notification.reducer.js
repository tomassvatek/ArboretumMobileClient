import {
    TREE_NAVIGATION_CANCEL,
    INTERNET_CONNECTION_LOST,
    SHOW_NOTIFICATION,
    DISMISS_NOTIFICATION
} from "../actions/redux-action-types";

export default function (state = {}, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return action.payload;
        case DISMISS_NOTIFICATION:
            return {};
        default:
            return state;
    }
}