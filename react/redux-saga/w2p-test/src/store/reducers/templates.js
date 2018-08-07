import * as actionTypes from '../actions/types';

const initialState = {
    templatesByIds: {},
    latestTemplatesIds: [],
    loading: false,
    error: null
}

const addTemplates = (state, action) => {
    return {
        ...state,
        templatesByIds: action.templatesById,
        loading: true,
        error: null
    }
}

const fetchTemplatesStart = state => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchLatestTemplatesSuccess = (state, action) => {
    return {
        ...state,
        latestTemplatesIds: action.latestTemplatesIds,
        loading: false
    }
}

const fetchTemplatesFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TEMPLATES: return addTemplates(state, action);
        case actionTypes.FETCH_LATEST_TEMPLATES_START: return fetchTemplatesStart(state);
        case actionTypes.FETCH_LATEST_TEMPLATES_SUCCESS: return fetchLatestTemplatesSuccess(state, action);
        case actionTypes.FETCH_LATEST_TEMPLATES_FAIL: return fetchTemplatesFail(state, action);
        default: return state;
    }
}

export default reducer;