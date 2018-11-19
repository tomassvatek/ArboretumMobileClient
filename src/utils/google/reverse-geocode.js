import axios from 'axios';
import qs from 'qs';

const GEOCODE_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';  
const GOOGLE_API_KEY = 'AIzaSyAeTR9DniCDMtCLdcYKtZ-TUH3JSPFVjuY';

/**
 * Convert geographic coordinates to the address.
 * @param {number} latitude 
 * @param {number} longitude 
 */
export const reverseGeocode = async (latitude, longitude) => {
    const url = buildGeocodeUrl(latitude, longitude);
    let { data } = await axios.get(url);

    if(data.error_message) {
        console.log('error');
        throw new Error(data.error_message);
    }

    const { results } = data;

    if (results.length === 0) {
        console.log('No Results');
        throw new Error('No Results');
    }

    let address = results[0].formatted_address;
    
    if(!address) {
        throw new Error('Address not found');
    }

    address = formatAddress(address);
    address = address.toString();

    return address;
}

const buildGeocodeUrl = (latitude, longitude) => {
    const query = qs.stringify({ 
        latlng: `${latitude},${longitude}`, 
        language: 'cs',
        key: GOOGLE_API_KEY
    });
    return `${GEOCODE_ROOT_URL}${query}`;
};


const formatAddress = address => {
    const arrayAddress = address.split(',');
    return removeCountry(arrayAddress);
}

// const removePostcode = address => {
//     let cityAddress = address[1];
//     if(!cityAddress)
//         return address;

//     cityAddress = cityAddress.trim();
//     const arr = cityAddress.split(' ');
//     arr.splice(0, 2);
//     // convert arr to object

//     console.log(arr);
// }

/**
 * Remove the city attribute from the address.
 * @param {string} address 
 */
const removeCountry = address => {
    address.pop();
    return address;
}