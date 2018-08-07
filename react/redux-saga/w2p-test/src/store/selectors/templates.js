import { createSelector } from 'reselect'
import { reduceByIds } from './utils';

//Reselect provides a function createSelector for creating memoized selectors. createSelector takes an array of input-selectors and a transform function as its arguments. If the Redux state tree is mutated in a way that causes the value of an input-selector to change, the selector will call its transform function with the values of the input-selectors as arguments and return the result. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.

// Input-selectors (non-memoized, they don't transform the data they select)
const getLatestTemplatesIds = state => state.latestTemplatesIds
const getTemplatesByIds = state => state.templatesByIds

// Memoized selector. It takes getLatestIds and getTemplatesByIds as input-selectors, and a transform function that calculates the filtered templatesByIds list
export const getLatestTemplates = createSelector(
    [getLatestTemplatesIds, getTemplatesByIds],
    (latestTemplatesIds, templatesByIds) => {

        return reduceByIds(latestTemplatesIds, templatesByIds);
    }
)