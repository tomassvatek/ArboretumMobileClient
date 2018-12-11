// Base server address 
const API_BASE_URL = 'http://arboretum.azurewebsites.net/api';

export const GET_TREES_EDNPOINT = `${API_BASE_URL}/trees?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}`;
export const GET_TREE_BY_ID_ENDPOINT = `${API_BASE_URL}/trees/{treeId}/provider/{providerId}`;
export const GET_CLOSEST_TREE_ENDPOINT = `${API_BASE_URL}/trees/closest/{count}?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}`;
export const GET_DENDROLOGIES_ENDPOINT = `${API_BASE_URL}/dendrologies`;
export const GET_DENDROLOGIES_DETAIL_ENDPOINT = `${API_BASE_URL}/dendrologies/?pageNumber={pageNumber}&pageSize={pageSize}`;
export const GET_CLOSEST_TREE_BY_DENDROLOGY_ENDPOINT = `${API_BASE_URL}/trees/closest/dendrology/{commonName}/?latitudeMin={latMin}&latitudeMax={latMax}&longitudeMin={lonMin}&longitudeMax={lonMax}&latitude={latitude}&longitude={longitude}`;
