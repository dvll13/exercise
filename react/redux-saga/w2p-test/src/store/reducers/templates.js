import * as actionTypes from '../actions/actionTypes';

const initialState = {
    templates: [],
    loading: false,
    error: null
}

const fetchTemplatesStart = state => {
    return {
        ...state,
        loading: true
    }
}

const fetchTemplatesSuccess = (state, action) => {
    return {
        ...state,
        templates: action.templates,
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
        case actionTypes.FETCH_TEMPLATES_START: return fetchTemplatesStart(state);
        case actionTypes.FETCH_TEMPLATES_SUCCESS: return fetchTemplatesSuccess(state, action);
        case actionTypes.FETCH_TEMPLATES_FAIL: return fetchTemplatesFail(state, action);
        default: return state;
    }
}

export default reducer;