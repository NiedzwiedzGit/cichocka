import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    imageContentPath: [],
    imageContentFullPath: [],
    loading: null,
    loadingContent: null,
    postContent: [],
    mainContent: {}
};

const fetchMainContentStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMainContentSuccess = (state, action) => {
    const path = action.path;
    const fullPath = action.fullPath;
    //console.log(action);
    const postContent = action.postContent
    // console.log('[Main Reduser path.]', fullPath);
    return updateObject(state, {
        imageContentPath: path,
        imageContentFullPath: fullPath,
        loading: false,
        postContent: postContent
    });
};
const fetchMainContentFail = (state, action) => {
    return updateObject(state, { loading: false });
};


const fetchPostContentStart = (state, action) => {
    return updateObject(state, { loadingContent: true });
};

const fetchPostContentSuccess = (state, action) => {
    // const postContent = action.postContent
    // console.log('[reduser main] ', action.postContent);
    return updateObject(state, {
        loadingContent: false,
        postContent: action.postContent
    });

};
const fetchPostContentFail = (state, action) => {
    return updateObject(state, { loadingContent: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MAIN_CONTENT_START: return fetchMainContentStart(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_SUCCESS: return fetchMainContentSuccess(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_FAIL: return fetchMainContentFail(state, action);
        case actionTypes.FETCH_POST_CONTENT_START: return fetchPostContentStart(state, action);
        case actionTypes.FETCH_POST_CONTENT_SUCCESS: return fetchPostContentSuccess(state, action);
        case actionTypes.FETCH_POST_CONTENT_FAIL: return fetchPostContentFail(state, action);
        default: return state;
    }
};

export default reducer;