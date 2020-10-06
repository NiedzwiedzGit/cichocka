import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { storage } from '../../shared/firebase';

export const fetchMainContentSuccess = (path, fullPath) => {
    console.log('path of img ', path);
    console.log('fullPath of img ', fullPath);
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
    return {
        type: actionTypes.FETCH_POST_CONTENT_SUCCESS,
        postContent: postContent
    };
};
export const fetchNewsMediaSuccess = (newsMedia) => {
    console.log('[reduser newsMedia] ', newsMedia);
    return {
        type: actionTypes.FETCH_NEWS_MEDIA_SUCCESS,
        newsMedia: newsMedia
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

export const getUrlArray = (urlArray) => {
    console.log("getUrlArray ", urlArray)

    return {
        type: actionTypes.FETCH_POST_URL_LIST,
        urlArray: urlArray

    }
}

// export const fetchMainContent = () => {
//     return dispatch => {
//         dispatch(() => fetchMainContentStart());

//         const storageRef = storage.ref();
//         const imagesRef = storageRef.child('images');
//         const fetchPath = [];
//         const fetchFullPath = [];
//         imagesRef.listAll().then(res => {       
//             res.items.forEach(f => {
//                 storage
//                     .ref(`${f.fullPath}`)
//                     .getDownloadURL()
//                     .then(url => {
//                         let obj={
//                            url: url.toString(),
//                            fullPath:f.fullPath.toString()
//                         }
//                         fetchFullPath.push(obj);
//                     });
//                 fetchPath.push(f.fullPath.toString());
//             })
//             dispatch(fetchMainContentSuccess(fetchPath, fetchFullPath));
//         }).catch(error => {
//             dispatch(fetchMainContentFail(error));
//         });
//     };
// };

export const fetchPostContent = () => {
    return dispatch => {
        dispatch(() => fetchPostContentStart());
        // axios.get('storage/images/')
        // .then(response => {
        //     console.log("------",response)
        //  })
        axios.get('/newposts.json')
            .then(response => {
                const fetchOrders = [];
                for (let key in response.data) {
                    fetchOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchPostContentSuccess(fetchOrders));
            }).catch(error => {
                dispatch(fetchPostContentFail(error));
            });

    };
};

export const fetchNewsMediaContent = () => {
    return dispatch => {
        dispatch(() => fetchPostContentStart());
        axios.get('/newsMedia.json')
            .then(response => {
                console.log('[reduser newsMedia!!!] ', newsMedia);
                const newsMedia = [];
                for (let key in response.data) {
                    newsMedia.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(fetchNewsMediaSuccess(newsMedia));
            }).catch(error => {
                dispatch(fetchPostContentFail(error));
            });
    }
}
export const deletePost = (id, imgName, key) => {
    console.log('[you want delete]=>', id)
    console.log('[you want delete imageContentPath]=>', imgName)
    return dispatch => {
        axios.delete(`/newposts/${id}.json`, { data: { imgName: imgName } }).then(response => {
            console.log(response);
        });
        axios.delete(`/newsMedia/${id}.json`, { data: { imgName: imgName } }).then(response => {
            console.log(response);
        });
        storage.ref(`/images/${imgName}?key=${key}`).delete();
        //     console.log('[you want delete path',`/images/${imgName}?key=${key}`)        
    };

    // storage.ref(`/images/${img.file.name}?key=${response.data.name}`).remove();
    // userRef.remove()
    // const uploadTask = storage.ref(`/images/${img.file.name}?key=${response.data.name}`).put(img.file);
};