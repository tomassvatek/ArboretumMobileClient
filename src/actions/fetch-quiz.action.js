import axios from 'axios';
import { FETCH_QUIZ_TREES } from './const/redux-action-types';
import { replaceStringPlaceholders } from '../utils/replace-string-placeholders';
import { GET_CLOSEST_TREE_ENDPOINT } from '../services/http/constants';

export const fetchQuizTrees = (count, boundingBox, userLocation, callback) => async dispatch => {
    try {
        const [lonMin, latMin, lonMax, latMax ] = boundingBox;
        const {latitude, longitude} = userLocation;
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_ENDPOINT, null, count, latMin, latMax, lonMin, lonMax, latitude, longitude);
        
        console.log(`GetQuizTrees: ${url}`);

        let { data } = await axios.get(url);
        dispatch({type: FETCH_QUIZ_TREES, payload: data});

        callback(data);
    }
    catch(error) {
        console.error(error);
    }
}
