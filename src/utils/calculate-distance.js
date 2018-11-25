import geolib from 'geolib';

export const calculateDistance = (origin, destination) => {
    try {
        console.log(origin.latitude);
        console.log(destination.latitude);
        let distance = geolib.getDistance(origin, destination);
        console.log(`Distance between origin: [${origin.latitude}, ${origin.longitude}] and destination: [${destination.latitude}, ${destination.longitude}] is ${distance} meters.`);
        return distance;
    } catch(error) {
        console.log("Distance cannot be calculated.");
    }
  }