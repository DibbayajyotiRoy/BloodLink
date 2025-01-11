import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
});

export default instance;