export const createIdsToObjects = objectsArray => {
    const idsToObjects = objectsArray.reduce((result, object) => {
        result[object.id] = object;
        return result;
    }, {});

    return {
        idsToObjects,
        ids: Object.keys(idsToObjects)
    }
};