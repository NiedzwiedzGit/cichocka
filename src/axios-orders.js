import axios from 'axios';

const instance = axios.create({
    baseURL: "https://cichocka-c6fc5.firebaseio.com/"
});

export default instance;