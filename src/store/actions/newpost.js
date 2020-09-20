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


export const addNewPost = (formData, isUpdate) => {
    console.log('addNewPost action ', formData);
    return dispatch => {
        dispatch(addNewPostStart());
        let imgName = [];
        let urlList = [];
        let data = {};
        let index = 0;
        if (!formData.imgName && !isUpdate) {
            Array.from(formData.imageFile).map((img, index) => {
                imgName.push(img.file.name);
                return imgName;
            });
            Array.from(formData.imageFile).map(img => {
                return storage.ref(`/images/${img.file.name}?key=${formData.key}`).put(img.file)
                    .then(res => {
                        storage
                            .ref(`${res.ref.fullPath}`)
                            .getDownloadURL().then(
                                url => {
                                    console.log('addNewPost action imgName', imgName);
                                    console.log(url.toString());
                                    urlList.push(url);
                                    data = {
                                        location: formData.location,
                                        photographs: formData.photographs,
                                        architecture: formData.architecture,
                                        year: formData.year,
                                        key: formData.key,
                                        imgName: imgName.toString(),
                                        url: urlList.toString()
                                    };
                                    index++;
                                    if (formData.imageFile.length === index) {
                                        axios.post(`/newposts.json`, data)
                                            .then(response => {
                                                dispatch(addNewPostSuccess(formData.imageFile));
                                                console.log('---------', data.key);
                                            })
                                            .catch(err => {
                                                dispatch(addNewPostFail())
                                            }
                                            );
                                    }
                                }
                            )
                    });
            });

            console.log('---------', data);
        } else {
            if (formData.imageFile.length >= 1) {
                storage.ref(`/images/${formData.imgName}?key=${formData.key}`).delete().then(response => {
                    axios.delete(`/newposts/${formData.id}.json`, { data: { key: formData.key } }).then(response => {
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
                                                    location: formData.location,
                                                    photographs: formData.photographs,
                                                    architecture: formData.architecture,
                                                    year: formData.year,
                                                    key: formData.key,
                                                    imgName: formData.imgName,
                                                    url: url.toString()
                                                };
                                                axios.post(`/newposts.json`, data)
                                                    .then(response => {
                                                        dispatch(addNewPostSuccess(formData.imageFile));
                                                    })
                                                    .catch(err => {
                                                        dispatch(addNewPostFail())
                                                    }
                                                    );
                                            }
                                        )
                                });
                        });
                    })
                })
            } else {
                axios.delete(`/newposts/${formData.id}.json`, { data: { key: formData.key } }).then(response => {
                    console.log(response);
                    axios.post(`/newposts.json`, formData)
                        .then(response => {
                            dispatch(addNewPostSuccess());
                            console.log('-----update----', formData.key);
                        })
                        .catch(err => {
                            dispatch(addNewPostFail())
                        }
                        );
                });
            }
        }

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
export const updatePostData = (postData) => {
    return {
        type: actionTypes.UPDATE_POST_DATA,
        updateData: postData
    }
}

