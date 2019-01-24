/**
 * Merge two arrays to one without duplicate elements.
 * @param {*} originArray 
 * @param {*} arrayToAdd 
 */
export const addArrayWithoutDuplicate = (sourceArray, arrayToAdd ) => {
    const result = [];

    arrayToAdd.forEach(item => {
        const elementExits = sourceArray.filter(element => element.id === item.id);
        if (elementExits.length === 0) {
            result.push(item);
        }
    });
    return result;
}