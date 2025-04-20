import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000'
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;

    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }

    return config;
});

export default api;
