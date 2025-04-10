import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // 필요 시 (쿠키 인증 시)
});

export default api;
