import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    imageContentPath: [],
    imageContentFullPath: [],
    loading: false
};

const fetchMainContentStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMainContentSuccess = (state, action) => {
    const path = action.path;
    const fullPath = action.fullPath;
    console.log('[Main Reduser path.]', fullPath);
    return updateObject(state, {
        imageContentPath: path,
        imageContentFullPath: fullPath,
        loading: false
    });
};
const fetchMainContentFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MAIN_CONTENT_START: return fetchMainContentStart(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_SUCCESS: return fetchMainContentSuccess(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_FAIL: return fetchMainContentFail(state, action);
        default: return state;
    }
};

export default reducer;