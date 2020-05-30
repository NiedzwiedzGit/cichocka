import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addNewpost = (fillContent) => {
    console.log(fillContent);
    return dispatch => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            country: this.state.country,
            region: this.state.region,
            author: this.state.author
        };
        axios.post('/newposts.json', data)
            .then(response => {
                console.log(response);
            });
    };
};


