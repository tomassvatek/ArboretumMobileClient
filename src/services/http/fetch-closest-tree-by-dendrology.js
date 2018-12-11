import axios from "axios";
import { replaceStringPlaceholders } from "../../utils";
import { GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT } from "./constants";

export const fetchClosestTreeByDendrology = async (commonName, latMin, latMax, lonMin, lonMax, currentLocation) => {
    try {
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT, null, commonName, latMin, latMax, lonMin, lonMax, currentLocation.latitude, currentLocation.longitude);
        //const url = replaceStringPlaceholders(GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT, null, dendrologyId);
        console.log(url);
        let { data } = await axios.get(url);
        return data;
    } catch(error) {
        console.log(error.message);
    }
}