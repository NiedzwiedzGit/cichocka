import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';

import {storage} from '../../shared/firebase';

export const fetchMainContentSuccess = (path, fullPath) => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_SUCCESS,
        path: path,
        fullPath: fullPath
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
                        //  console.log("Got download url: ", url);
                    });
                fetchPath.push(f.fullPath.toString());
                //console.log(f.fullPath)
            })
            dispatch(fetchMainContentSuccess(fetchPath, fetchFullPath));

        }).catch(error => {
            dispatch(fetchMainContentFail(error));
        });
        fetchPath.map(value => {
            return console.log('[inside map ]' + value);
        });

        // console.log(fetchPath);
        // orders: orders
    };
};