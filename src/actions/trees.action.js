import axios from 'axios';
import { FETCH_TREES } from './types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_TREES_EDNPOINT } from '../config';

// TODO: REMOVE qs library from project.
export const fetchTrees = (latMin, latMax, lonMin, lonMax, callback ) => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_TREES_EDNPOINT, null, latMin, latMax, lonMin, lonMax);
        let { data } = await axios.get(url);
        dispatch({type: FETCH_TREES, payload: data});
        callback();
    }
    catch(error) {
        console.error(error);
    }
}
