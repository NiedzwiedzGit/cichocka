import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';

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

        const firebaseConfig = {
            apiKey: "AIzaSyBot6sPtRy9jVw92sVBevsTiL0vHCJzReg",
            authDomain: "cichocka-c6fc5.firebaseapp.com",
            databaseURL: "https://cichocka-c6fc5.firebaseio.com",
            projectId: "cichocka-c6fc5",
            storageBucket: "cichocka-c6fc5.appspot.com",
            messagingSenderId: "874982592562",
            appId: "1:874982592562:web:45166de12b61cc2323ec2b",
            measurementId: "G-1458J9ZZ5P"
        };


        firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();
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