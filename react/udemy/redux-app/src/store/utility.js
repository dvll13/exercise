export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues //adds the property or replaces it if present in the oldObject
    }
}