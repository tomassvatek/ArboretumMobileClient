import { Permissions, Location } from 'expo';
import {
    USER_LOCATION_CHANGE_FAILURE,
    USER_LOCATION_CHANGE_SUCCESS
} from './types';

export const getUserLocation = (callback) => async dispatch => {
    try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch({ type: USER_LOCATION_CHANGE_FAILURE });
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        let coordinate = {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
        dispatch({ type: USER_LOCATION_CHANGE_SUCCESS, payload: coordinate })
        callback();
    }
    catch(error) {
        console.error(error);
    }
}

