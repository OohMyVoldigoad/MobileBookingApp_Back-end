import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://10.170.8.184:8000/api', 
    headers: {
        Accept: 'application/json',
    },
});

export default Api;
