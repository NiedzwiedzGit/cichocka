import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchMaineContentSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_SUCCESS,
        orders: orders
    };
};
export const fetchMaineContentStart = () => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_START
    };
};
export const fetchMaineContentFail = (error) => {
    return {
        type: actionTypes.FETCH_MAIN_CONTENT_FAIL,
        error: error
    };
};