// Base server address 
const API_BASE_URL = 'http://arboretum.azurewebsites.net/api';

export const GET_TREES = `${API_BASE_URL}/trees?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}`;
export const GET_TREE_BY_ID = `${API_BASE_URL}/trees/{treeId}/provider/{providerId}`;