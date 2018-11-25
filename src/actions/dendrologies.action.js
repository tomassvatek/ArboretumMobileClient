import axios from 'axios';
import { FETCH_DENDROLOGIES } from './types';
import { GET_DENDROLOGIES_ENDPOINT } from '../api/constants';

export const fetchDendrologies = () => async dispatch => {
    try {
        const url = GET_DENDROLOGIES_ENDPOINT;
        let { data } = await axios.get(url);
        dispatch({type: FETCH_DENDROLOGIES, payload: data});
    }
    catch(error) {
        console.error(error);
    }
}
