import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { storage } from '../../shared/firebase';

export const fetchMainContentSuccess = (path, fullPath) => {
    console.log('[fetchMainContentSuccess] ');
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_SUCCESS,
        path: path,
        fullPath: fullPath,
    };

};
export const fetchMainContentStart = () => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_START
    };
};
export const fetchMainContentFail = (error) => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_FAIL,
        error: error
    };
};


export const fetchPostContentSuccess = (postContent) => {
    console.log('[reduser mainactions] ', postContent);
    console.log('[fetchPostContentSuccess] ');

    return {
        type: actionTypes.FETCH_POST_CONTENT_SUCCESS,
        postContent: postContent
    };
};
export const fetchPostContentStart = () => {
    return {
        type: actionTypes.FETCH_POST_CONTENT_START
    };
};
export const fetchPostContentFail = (error) => {
    return {
        type: actionTypes.FETCH_POST_CONTENT_FAIL,
        error: error
    };
};

export const createMainContent = () => {

    return
    {
        type: actionTypes.CREATE_MAIN_CONTENT_VARIABLE
    };
};

export const fetchMainContent = () => {
    return dispatch => {
        dispatch(() => fetchMainContentStart());

        const storageRef = storage.ref();
        const imagesRef = storageRef.child('images');
        const fetchPath = [];
        const fetchFullPath = [];

        imagesRef.listAll().then(res => {
            res.items.forEach(f => {
                // All the items under listRef.
                storage
                    .ref(`${f.fullPath}`)
                    .getDownloadURL()
                    .then(url => {
                        fetchFullPath.push(url.toString());
                        // console.log("Got download url: ", url);
                    });
                fetchPath.push(f.fullPath.toString());
                // console.log(f.fullPath);
                // console.log(new Date().getTime())  <- for makink uniqe key
            })
            dispatch(fetchMainContentSuccess(fetchPath, fetchFullPath));


        }).catch(error => {
            dispatch(fetchMainContentFail(error));
        });


    };
};

export const fetchPostContent = () => {
    return dispatch => {
        dispatch(() => fetchPostContentStart());
        axios.get('/newposts.json')
            .then(response => {
                const fetchOrders = [];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                //console.log(fetchOrders);

                dispatch(fetchPostContentSuccess(fetchOrders));
                // console.log(response.data[key]);
            }).catch(error => {
                dispatch(fetchPostContentFail(error));
            });

    };
};