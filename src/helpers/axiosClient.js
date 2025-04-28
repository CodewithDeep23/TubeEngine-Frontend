import axios from 'axios';
import { BASE_URL } from '../conf/conf.js';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export default axiosClient;