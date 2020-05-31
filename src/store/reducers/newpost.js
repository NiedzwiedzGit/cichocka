import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {

};

const addNewPostStart=()=>{
return
};

const addNewPostSuccess=()=>{
    return
    };

 const addNewPostFail=()=>{
        return
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