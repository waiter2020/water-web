
import service from 'axios';
import router from './router';


// 创建axios实例
const axios = service.create({
    baseURL: 'http://139.199.20.39:8081', // api的base_url
    timeout: 15000,                  // 请求超时时间
});

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    });

export default axios;
