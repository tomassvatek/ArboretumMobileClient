// Geolocation actions
export const USER_LOCATION_CHANGE_REQUEST = 'user_location_change_request';
export const USER_LOCATION_CHANGE_FAILURE = 'user_location_change_failure';
export const USER_LOCATION_CHANGE_SUCCESS = 'user_location_change_success';

export const REGION_CHANGE = 'region_change';

// Fetch data from an API actions
export const FETCH_TREES = 'fetch_trees';
export const FETCH_TREE_DETAIL = 'fetch_tree_detail';
export const FETCH_QUIZ_TREES = 'fetch_quiz_trees';
export const FETCH_DENDROLOGIES = 'fetch_dendrologies';
export const FETCH_CLOSEST_TREE_BY_DENDROLOGY = 'fetch_closest_tree_by_dendrology';
//FIXME: Rename to fetch coordinates
export const NAVIGATE_USER = 'navigate_user';


// State of the app
export const CONNECTION_STATUS_CHANGE = 'change_connection_status';

// Notification actions
//export const INTERNET_CONNECTION_LOST = 'internet_connection_lost';
//export const TREE_NAVIGATION_CANCEL = 'tree_navigation_cancel';
export const SHOW_NOTIFICATION = 'show_notification';
export const DISMISS_NOTIFICATION = 'dismiss_notification';
