import axios from 'axios';
import { FETCH_TREES } from './types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_TREES } from '../config';

// TODO: REMOVE qs library from project.
export const fetchTrees = () => async dispatch => {
    try {
        const url = replaceStringPlaceholders(GET_TREES, null, 0, 0, 0, 0);
        console.log(url);
        let { data } = await axios.get(url);
        dispatch({type: FETCH_TREES, payload: data});
    }
    catch(error) {
        console.error(error);
    }
}
