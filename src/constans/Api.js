import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://192.168.43.243:8000/api',
});

export default Api;
