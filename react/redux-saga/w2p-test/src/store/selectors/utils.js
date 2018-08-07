export const reduceByIds = (ids, idsToObjects) => {
    return ids.reduce((result, id) => {
        if (id in idsToObjects) {
            result.push(idsToObjects[id])
        }
        return result
    }, [])
}