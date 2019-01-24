import { CONNECTION_STATUS_CHANGE } from "./const/redux-action-types";

export const changeConnectionStatus = (status) => dispatch => {
    console.log(`Connection status changed to ${status}`);
    dispatch({type: CONNECTION_STATUS_CHANGE, payload: status });
}