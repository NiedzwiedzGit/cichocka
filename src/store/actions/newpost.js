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
    console.log("addNewPostSuccess",imageFile);
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
    console.log('testt loader loop');
    return {
        type: actionTypes.ADD_ANIMATE_SCS_ERR_BTN
    };
};


export const addNewPost = (formData) => {
    console.log(formData);
    // console.log('checking wher is key = ',postKey);
    // console.log('-----',imageFile)
    return dispatch => {
        dispatch(addNewPostStart());
        let imgName='';
        Array.from(formData.imageFile).map(img => {
             imgName = img.file.name;
        });
        const data = {
            // title: this.state.title,
            // country: country,
            // region: region,
            location:formData.street,
            author:formData.author,
            architecture:formData.architecture,
            year: formData.year,
            key: formData.key,
            imgName:imgName
            // imageNeme:imageFile.
        };
        console.log(data);
        axios.post(`/newposts.json`,data)
            .then(response => {
                dispatch(addNewPostSuccess(formData.imageFile));
                 console.log('---------', data.key);
                // console.log("Data post on server");
                Array.from(formData.imageFile).map(img => {
                 storage.ref(`/images/${img.file.name}?key=${data.key}`).put(img.file);
                });
                //  .then(response => {});

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

export const addNewPostContainer=()=>{
    return {
        type:actionTypes.ADD_NEW_POST_CONTAINER
    }
}

