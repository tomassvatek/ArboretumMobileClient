import axios from 'axios';
import { FETCH_QUIZ_TREES } from './redux-action-types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_CLOSEST_TREE_ENDPOINT } from '../services/http/constants';

export const fetchQuizTrees = (latMin, latMax, lonMin, lonMax, count, callback ) => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_ENDPOINT, null, count, latMin, latMax, lonMin, lonMax);
        console.log(`GetQuizTrees: ${url}`);
        let { data } = await axios.get(url);
        dispatch({type: FETCH_QUIZ_TREES, payload: data});
        callback(data);
    }
    catch(error) {
        console.error(error);
    }
}
