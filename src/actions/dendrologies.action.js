import axios from 'axios';
import { FETCH_DENDROLOGIES } from './types';
import { GET_DENDROLOGIES } from '../config';

export const fetchDendrologies = () => async dispatch => {
    try {
        const url = GET_DENDROLOGIES;
        console.log(`Get dendrologies: ${url}`)
        let { data } = await axios.get(url);
        console.log(data);
        dispatch({type: FETCH_DENDROLOGIES, payload: data});
    }
    catch(error) {
        console.error(error);
    }
}
