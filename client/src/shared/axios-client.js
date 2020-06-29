import axios from 'axios';

const { REACT_APP_API_URL: API_URL } = process.env;

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const authTokenInterceptor = (req) => {
    const token = localStorage.getItem('token');
    if(token){
        req.headers['Authorization'] = `Bearer ${token}`; 
    }
    return req;
};

const reauthInterceptor = (res) => {
    if(res.status === 401){
        console.log('Refresh Auth');
    }
    return res;
};

instance.interceptors.request.use(req => authTokenInterceptor(req));
instance.interceptors.response.use(res => reauthInterceptor(res));

export default instance;
