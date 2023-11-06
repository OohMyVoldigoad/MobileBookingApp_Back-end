import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.170.2.13:8000/api',
});

export default Api;
