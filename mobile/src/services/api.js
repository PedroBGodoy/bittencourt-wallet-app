import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mighty-wave-79384.herokuapp.com/',
})

export default api;