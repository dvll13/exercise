import * as actionTypes from './types';

export const addTemplates = templatesById => {
    return {
        type: actionTypes.ADD_TEMPLATES,
        templatesById
    }
}

export const fetchLatestTemplates = () => {
    return {
        type: actionTypes.FETCH_LATEST_TEMPLATES
    }
}

export const fetchLatestTemplatesStart = () => {
    return {
        type: actionTypes.FETCH_LATEST_TEMPLATES_START
    }
}

export const fetchLatestTemplatesSuccess = latestTemplatesIds => {
    return {
        type: actionTypes.FETCH_LATEST_TEMPLATES_SUCCESS,
        latestTemplatesIds
    }
}

export const fetchLatestTemplatesFail = error => {
    return {
        type: actionTypes.FETCH_LATEST_TEMPLATES_FAIL,
        error
    }
}