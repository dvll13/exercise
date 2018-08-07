import { createSelector } from 'reselect'
import { reduceByIds } from './utils';

const getLatestInstancesIds = state => state.latestInstancesIds
const getInstancesByIds = state => state.instancesByIds

export const getLatestInstances = createSelector(
    [getLatestInstancesIds, getInstancesByIds],
    (latestInstancesIds, instancesByIds) => {
        return reduceByIds(latestInstancesIds, instancesByIds);
    }
)