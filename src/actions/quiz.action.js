import axios from 'axios';
import { FETCH_QUIZ_TREES } from './types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_CLOSEST_TREE_ENDPOINT } from '../config';

export const fetchQuizTrees = (latMin, latMax, lonMin, lonMax, count, callback ) => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_ENDPOINT, null, count, latMin, latMax, lonMin, lonMax);
        let { data } = await axios.get(url);
        dispatch({type: FETCH_QUIZ_TREES, payload: data});
        callback();
    }
    catch(error) {
        console.error(error);
    }
}
