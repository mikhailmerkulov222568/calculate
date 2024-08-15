import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://calculate-beryl.vercel.app',
});
export default axiosApi;

