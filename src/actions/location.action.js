import {
    Permissions,
    Location
} from 'expo';
import {
    USER_LOCATION_CHANGE_FAILURE,
    USER_LOCATION_CHANGE_SUCCESS
} from './redux-action-types';

/**
 * Get current user location.
 * @param {*} callback function
 */
export const getUserLocation = (callback) => async dispatch => {
    try {
        let {
            permissionStatus
        } = await Permissions.askAsync(Permissions.LOCATION);
        if (permissionStatus !== 'granted') {
            dispatch({
                type: USER_LOCATION_CHANGE_FAILURE
            });
        }

        let {
            coords
        } = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            maximumAge: 120000
        });
        let coordinate = {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        dispatch({
            type: USER_LOCATION_CHANGE_SUCCESS,
            payload: coordinate
        })
        typeof callback === 'function' && callback(coordinate);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Start tracking user location.
 * @param {*} distanceInterval in meters 
 * @param {*} callback function
 */
export const watchPosition = (distanceInterval = 50, callback) => async dispatch => {
    try {
        await Location.watchPositionAsync({
            enableHighAccuracy: true,
            timeInterval: 5000,
            distanceInterval: distanceInterval
        }, (coords) => {
            let coordinate = {
                latitude: coords.coords.latitude,
                longitude: coords.coords.longitude
            }
            dispatch({
                type: USER_LOCATION_CHANGE_SUCCESS,
                payload: coordinate
            });
            typeof callback === 'function' && callback(coordinate);
        })
    } catch (error) {
        console.error(error);
    }
}