import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
loading:false
};


const addNewPostStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const addNewPostSuccess = (state, action) => {
    return updateObject(state, { loading: false });
};

const addNewPostFail = (state, action) => {
    return updateObject(state, { loading: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_POST_START: return addNewPostStart(state, action);
        case actionTypes.ADD_NEW_POST_SUCCESS: return addNewPostSuccess(state, action);
        case actionTypes.ADD_NEW_POST_FAIL: return addNewPostFail(state, action);

        default: return state;
    }
};

export default reducer;