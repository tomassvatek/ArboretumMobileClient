import { combineReducers } from 'redux';
import location from './location.reducer';
import trees from './trees.reducer';
import treeDetail from './tree-detail.reducer';

export default combineReducers({
    location,
    trees,
    treeDetail
});