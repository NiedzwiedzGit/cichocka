import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addNewPost = (content,country,region,author) => {
    console.log(content,country,region,author);
    return dispatch => {
        const data = {
            // title: this.state.title,
            content:content,
            country: country,
            region:region,
            author: author
        };
        axios.post('/newposts.json', data)
            .then(response => {
                console.log(response);
                console.log("Data post on server");
            });
    };
};


