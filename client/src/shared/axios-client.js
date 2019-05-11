import axios from 'axios';

const { REACT_APP_API_URL: API_URL } = process.env;

const instance = axios.create({
    baseURL: API_URL,
});

const AUTH_TOKEN = localStorage.getItem('token');

instance.defaults.headers.common['Authorization'] = AUTH_TOKEN ? AUTH_TOKEN : '';
instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;