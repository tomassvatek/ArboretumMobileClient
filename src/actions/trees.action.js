import axios from 'axios';
import { FETCH_TREES } from './types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_TREES_EDNPOINT } from '../api/constants';

export const fetchTrees = (latMin, latMax, lonMin, lonMax, callback ) => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_TREES_EDNPOINT, null, latMin, latMax, lonMin, lonMax);
        //TODO: Remove console log
        console.log(`Get trees: ${url}`)
        let { data } = await axios.get(url);
        data.length > 0 && dispatch({type: FETCH_TREES, payload: data});
        typeof callback === 'function' && callback();
    }
    catch(error) {
        console.error(error);
    }
}
