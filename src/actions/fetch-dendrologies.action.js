import axios from 'axios';
import { FETCH_DENDROLOGIES } from './redux-action-types';
import { GET_DENDROLOGIES_ENDPOINT } from '../services/http/constants';

export const fetchDendrologies = () => async dispatch => {
    try {
        const url = GET_DENDROLOGIES_ENDPOINT;
        const { data } = await axios.get(url);
        dispatch({type: FETCH_DENDROLOGIES, payload: data});
    }
    catch(error) {
        console.error(error);
    }
}
