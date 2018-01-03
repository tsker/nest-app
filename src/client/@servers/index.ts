import axios from 'axios';
export * from './github';

axios.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(err) {
        window['err'] = err;
        if (err.request.status === 401) {
            err = new Error('用户密码错误');
        }
        return Promise.reject(err);
    }
);
