import { Permissions, Location } from 'expo';
import {
    USER_LOCATION_CHANGE_FAILURE,
    USER_LOCATION_CHANGE_SUCCESS
} from './types';

export const getUserLocation = () => async dispatch => {
    try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch({ type: USER_LOCATION_CHANGE_FAILURE });
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        dispatch({ type: USER_LOCATION_CHANGE_SUCCESS, payload: coords })
    }
    catch(error) {
        console.error(error);
    }
}

