import {
    replaceStringPlaceholders
} from "../../utils";
import { GET_DENDROLOGIES_DETAIL_ENDPOINT } from './constants';
import axios from "axios";

export const fetchDendrologies = async (pageNumber, pageSize) => {
    try {
        const url = replaceStringPlaceholders(GET_DENDROLOGIES_DETAIL_ENDPOINT, null, pageNumber, pageSize);
        console.log(url);
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}