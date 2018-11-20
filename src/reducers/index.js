import { combineReducers } from 'redux';
import location from './location.reducer';
import trees from './trees.reducer';
import treeDetail from './tree-detail.reducer';
import quiz from './quiz.reducer';
import region from './map-region.reducer';

export default combineReducers({
    location,
    trees,
    treeDetail,
    quiz,
    region
});