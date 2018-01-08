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

export const Api = {
	get(url, ...args) {
		return axios.get(url, ...args);
	},
	post(url, ...args) {
		return axios.post(url, ...args);
	},
	delete(url, ...args) {
		return axios.delete(url, ...args);
	},
	put(url, ...args) {
		return axios.put(url, ...args);
	}
};
