import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.170.5.73:8000/api',
});

export default Api;
