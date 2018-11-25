import { combineReducers } from 'redux';
import location from './location.reducer';
import trees from './trees.reducer';
import treeDetail from './tree-detail.reducer';
import quiz from './quiz.reducer';
import dendrologies from './dendrologies.reducer';
import networkStatus from './network-connection.reducer';

export default combineReducers({
    location,
    trees,
    dendrologies,
    treeDetail,
    quiz,
    networkStatus
});