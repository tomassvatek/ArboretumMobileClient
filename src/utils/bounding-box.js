export const getBoundingBox = (region) => ([
    region.longitude - region.longitudeDelta / 2,
    region.latitude - region.latitudeDelta / 2, 
    region.longitude + region.longitudeDelta / 2, 
    region.latitude + region.latitudeDelta / 2 
])