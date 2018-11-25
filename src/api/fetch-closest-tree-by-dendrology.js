import axios from "axios";
import { replaceStringPlaceholders } from "../utils/replace-string-placeholders";
import { GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT } from "./constants";

export const fetchClosestTreeByDendrology = async (dendrologyId) => {
    try {
        const url = replaceStringPlaceholders(GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT, null, dendrologyId);
        let { data } = await axios.get(url);
        return data;
    } catch(error) {
        console.log(error.message);
    }
}