import {
    FETCH_TREES
} from "../actions/redux-action-types";
import { addArrayWithouDuplicate } from "../utils";

//FIXME: Pokud jsem na poloze kde nejsou žádné stromy a změním polohu
//       na místo, kde stromy jsou, data se načtou až po další změně polohy.
export default function (treesState = [], action) {
    switch (action.type) {
        case FETCH_TREES:
            const fetchTrees = addArrayWithouDuplicate(treesState, action.payload);
            return treesState.concat(fetchTrees);
        default:
            return treesState;
    }
}