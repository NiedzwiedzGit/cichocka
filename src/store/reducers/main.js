import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    imageContentPath: [],
    imageContentFullPath: [],
    loading: null,
    loadingContent: null,
    postContent: [],
    newsMedia: [],
    textVar: [],
    refresh: false,
    urlArray: null
};

const fetchMainContentStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMainContentSuccess = (state, action) => {
    return updateObject(state, {
        imageContentPath: action.path,
        imageContentFullPath: action.fullPath,
        loading: false,
        refresh: true
    });
};
const fetchMainContentFail = (state, action) => {
    return updateObject(state, { loading: false });
};


const fetchPostContentStart = (state, action) => {
    return updateObject(state, { loadingContent: true });
};

const fetchPostContentSuccess = (state, action) => {
    return updateObject(state, {
        loadingContent: false,
        postContent: action.postContent
    });

};
const fetchNewsMediaSuccess = (state, action) => {
    return updateObject(state, {
        // loadingContent: false,
        newsMedia: action.newsMedia
    });
};

const fetchTextSuccess = (state, action) => {
    return updateObject(state, {
        // loadingContent: false,
        textVar: action.textVar
    });
};
const fetchPostContentFail = (state, action) => {
    return updateObject(state, { loadingContent: false });
};
const fetchPostUrlList = (state, action) => {
    return updateObject(state, { urlArray: action.urlArray });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MAIN_CONTENT_START: return fetchMainContentStart(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_SUCCESS: return fetchMainContentSuccess(state, action);
        case actionTypes.FETCH_MAIN_CONTENT_FAIL: return fetchMainContentFail(state, action);
        case actionTypes.FETCH_POST_CONTENT_START: return fetchPostContentStart(state, action);
        case actionTypes.FETCH_POST_CONTENT_SUCCESS: return fetchPostContentSuccess(state, action);
        case actionTypes.FETCH_POST_CONTENT_FAIL: return fetchPostContentFail(state, action);
        case actionTypes.FETCH_POST_URL_LIST: return fetchPostUrlList(state, action);
        case actionTypes.FETCH_NEWS_MEDIA_SUCCESS: return fetchNewsMediaSuccess(state, action);
        case actionTypes.FETCH_TEXT_SUCCESS: return fetchTextSuccess(state, action);

        default: return state;
    }
};

export default reducer;