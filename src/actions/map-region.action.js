import { REGION_CHANGE } from "./types";

export const regionChange = (region) => dispatch => {
    dispatch({type: REGION_CHANGE, payload: region });
}