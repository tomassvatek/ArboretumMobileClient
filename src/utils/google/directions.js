import axios from 'axios';
import qs from 'qs';
import Polyline from '@mapbox/polyline';

// Move to diffrent file (config)
const DIRECTIONS_ROOT_URL = `https://maps.googleapis.com/maps/api/directions/json?`;  
const GOOGLE_API_KEY = 'AIzaSyAeTR9DniCDMtCLdcYKtZ-TUH3JSPFVjuY';

/**
 * Fetch the route from Google Directions API.
 * @param {latng} origin 
 * @param {latng} destination 
 */
export const getPolylineCoordinates = async (origin, destination) => {
    try {
        const url = buildDirectionsUrl(origin, destination);
        let { data } = await axios.get(url);
        let points = Polyline.decode(data.routes[0].overview_polyline.points);
        let coords = points.map(point => {
            return {
                latitude: point[0],
                longitude: point[1]
            }
        })

        return coords;

    } catch(err) {
        console.log(err);
    }
}

/**
 * Build Directions Url. The query string is built by qs library.
 * @param {latng} origin 
 * @param {latng} destination 
 */
const buildDirectionsUrl = (origin, destination) => {
    const travelMode = 'walking';
    
    const query = qs.stringify({ 
        origin: `${origin.latitude},${origin.longitude}`, 
        destination: `${destination.latitude},${destination.longitude}`, 
        mode: travelMode, 
        key: GOOGLE_API_KEY  
    });
    return `${DIRECTIONS_ROOT_URL}${query}`;
}
