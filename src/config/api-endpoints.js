// Base server address 
const API_BASE_URL = 'http://arboretum.azurewebsites.net/api';

export const GET_TREES_EDNPOINT = `${API_BASE_URL}/trees?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}`;
export const GET_TREE_BY_ID_ENDPOINT = `${API_BASE_URL}/trees/{treeId}/provider/{providerId}`;
export const GET_CLOSEST_TREE_ENDPOINT = `${API_BASE_URL}/trees/{closest}/{count}?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}`;