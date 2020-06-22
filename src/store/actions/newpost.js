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
    console.log("addNewPostSuccess", imageFile);
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS,
        imageFile: imageFile
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
        let imgName = '';
        Array.from(formData.imageFile).map(img => {
            return imgName = img.file.name;
        });

        //  console.log(data);
        Array.from(formData.imageFile).map(img => {
            return storage.ref(`/images/${img.file.name}?key=${formData.key}`).put(img.file)
                .then(res => {
                    let data = {};
                    storage
                        .ref(`${res.ref.fullPath}`)
                        .getDownloadURL().then(
                            url => {
                                console.log(url.toString());
                                data = {
                                    // title: this.state.title,
                                    // country: country,
                                    // region: region,
                                    location: formData.street,
                                    author: formData.author,
                                    architecture: formData.architecture,
                                    year: formData.year,
                                    key: formData.key,
                                    imgName: imgName,
                                    url: url.toString()
                                    // imageNeme:imageFile.
                                };
                                axios.post(`/newposts.json`, data)
                                    .then(response => {
                                        dispatch(addNewPostSuccess(formData.imageFile));
                                        console.log('---------', data.key);
                                        // console.log("Data post on server");

                                        //  .then(response => {});

                                    })
                                    .catch(err => {
                                        dispatch(addNewPostFail())
                                    }
                                    );
                            }
                        )



                });
        });

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

export const addNewPostContainer = () => {
    return {
        type: actionTypes.ADD_NEW_POST_CONTAINER
    }
}
export const updatePostData = (author, country, region, year, key) => {
    let updateData = {
        author: author,
        country: country,
        region: region,
        year: year,
        key: key
    }
    return {
        type: actionTypes.UPDATE_POST_DATA,
        updateData: updateData
    }
}

