import * as actionTypes from './actionTypes';

export const fetchTemplates = () => {
    return {
        type: actionTypes.FETCH_TEMPLATES
    }
}

export const fetchTemplatesStart = () => {
    return {
        type: actionTypes.FETCH_TEMPLATES_START
    }
}

export const fetchTemplatesSuccess = templates => {
    return {
        type: actionTypes.FETCH_TEMPLATES_SUCCESS,
        templates
    }
}

export const fetchTemplatesFail = error => {
    return {
        type: actionTypes.FETCH_TEMPLATES_FAIL,
        error
    }
}