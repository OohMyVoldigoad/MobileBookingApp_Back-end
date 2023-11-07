import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.170.9.3:8000/api',
});

export default Api;
