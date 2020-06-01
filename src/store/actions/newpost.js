import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addNewPostStart = () => {
    console.log("addNewPostStart");
    return {
        type: actionTypes.ADD_NEW_POST_START
    };
};
export const addNewPostSuccess = () => {
    console.log("addNewPostSuccess");
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS
    };
};

export const addNewPostFail = () => {
    console.log("addNewPostFail");
    return {
        type: actionTypes.ADD_NEW_POST_FAIL
    };
};

export const addNewPost = (content, country, region, author) => {
    console.log(content, country, region, author);
    return dispatch => {
        dispatch(addNewPostStart());
        const data = {
            // title: this.state.title,
            content: content,
            country: country,
            region: region,
            author: author
        };
        axios.post('/newposts.json', data)
            .then(response => {
                dispatch(addNewPostSuccess());
                console.log(response);
                console.log("Data post on server");
            })
            .catch(err => {
                dispatch(addNewPostFail())
            }
            );
    };
};


