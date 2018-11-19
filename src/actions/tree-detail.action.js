import axios from 'axios';
import { replaceStringPlaceholders } from "../utils/replace-string-placeholders";
import { GET_TREE_BY_ID_ENDPOINT } from "../config";
import { FETCH_TREE_DETAIL } from "./types";

export const fetchTreeById = (treeId, providerId, callback) => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_TREE_BY_ID_ENDPOINT, null, treeId, providerId);
        let { data } = await axios.get(url);
        dispatch({type: FETCH_TREE_DETAIL, payload: data});
        callback();
    }
    catch(error) {
        console.error(error);
    }
}