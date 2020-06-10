import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { storage } from '../../shared/firebase';

export const addNewPostStart = () => {
    console.log("addNewPostStart");
    return {
        type: actionTypes.ADD_NEW_POST_START
    };
};
export const addNewPostSuccess = (imageFile) => {
    console.log("addNewPostSuccess");
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS,
imageFile:imageFile
    };
};

export const addNewPostFail = () => {
    console.log("addNewPostFail");
    return {
        type: actionTypes.ADD_NEW_POST_FAIL
    };
};
export const animateSuccesErrorButton = () => {
    return {
        type: actionTypes.ADD_ANIMATE_SCS_ERR_BTN
    };
};


export const addNewPost = (content, country, region, author, year, imageFile, key) => {
    console.log(content, country, region, author, year, key);
    console.log('-----',imageFile)
    return dispatch => {
        dispatch(addNewPostStart());
        let imgName='';
        Array.from(imageFile).map(img => {
             imgName = img.file.name;
        });
        const data = {
            // title: this.state.title,
            content: content,
            country: country,
            region: region,
            author: author,
            year: year,
            key: key,
            imgName:imgName
            // imageNeme:imageFile.
        };
        console.log(data);
        axios.post(`/newposts.json`,data)
            .then(response => {
                dispatch(addNewPostSuccess(imageFile));
                 //console.log('---------', response);
                // console.log("Data post on server");
                Array.from(imageFile).map(img => {
                 storage.ref(`/images/${img.file.name}?key=${response.data.name}`).put(img.file);
                });
            //     Array.from(imageFile).map(img => {
            //         axios.post(`/images/${img.file.name}?key=${response.data.name}`,img.file)
            // .then(response => {});
            //     });
            })
            .catch(err => {
                dispatch(addNewPostFail())
            }
            );
   
        // initiates the firebase side uploading
        // uploadTask.on('state_changed',
        //     (snapShot) => {
        //         //takes a snap shot of the process as it is happening
        //         console.log(snapShot)
        //     }, (err) => {
        //         console.log(err)
        //     }, () => {
        //         storage.ref('images').child(this.state.imageFile.name).getDownloadURL()
        //             .then(fireBaseUrl => {
        //                 console.log('[storege ref] ' + fireBaseUrl);
        //             })
        //     })
    };
};


