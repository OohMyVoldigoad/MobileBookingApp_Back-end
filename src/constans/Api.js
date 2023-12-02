import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://sportscamp.my.id/api',
});

export default Api;
