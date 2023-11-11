import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.170.4.99:8000/api',
});

export default Api;
