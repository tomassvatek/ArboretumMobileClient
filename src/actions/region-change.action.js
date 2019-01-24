import { REGION_CHANGE } from "./const/redux-action-types";

export const regionChange = (region, callback) => async dispatch => {
    dispatch({type: REGION_CHANGE, payload: region});
    typeof(callback) === 'function' && callback();
}