import { DISMISS_NOTIFICATION, SHOW_NOTIFICATION } from "./const/redux-action-types";

export const showNotification = (notification) => dispatch => {
    dispatch({type: SHOW_NOTIFICATION, payload: notification});
}

export const dismissNotification = () => dispatch => {
    dispatch({type: DISMISS_NOTIFICATION});
}