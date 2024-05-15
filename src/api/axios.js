import axios from 'axios';

const BASE_URL = import.meta.env.VITE_URL_API;
const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;

export default axios.create({
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    baseURL : BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    timeout: 10000,
    headers: { 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(SESSION_NAME))?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials : true
});

axiosPrivate.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem(SESSION_NAME))?.token;
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});