import { GET_CLOSEST_TREE_ENDPOINT } from "./constants";
import axios from "axios";
import { replaceStringPlaceholders } from "../../utils";

const CLOSEST_TREE_COUNT = 1;

export const fetchClosestTree = async (latMin, latMax, lonMin, lonMax, currentLocation) => {
    try {
        console.log(currentLocation);
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_ENDPOINT, null, CLOSEST_TREE_COUNT, latMin, latMax, lonMin, lonMax, currentLocation.latitude, currentLocation.longitude);
        console.log(url);
        const { data } = await axios.get(url);

        return data[0];
    }
    catch(error) {
        console.error(error);
    }
}