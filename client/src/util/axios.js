import axios from 'axios'
import { message } from 'antd'
import authStore from '../store/index'

const BASE_URL = {
	development: 'http://127.0.0.1:3030',
	production: 'http://yunxi.site:3030'
}

/* =================== axios interceptors =================== */
const axiosIns = axios.create({
	timeout: 2000,
	baseURL: BASE_URL[process.env.NODE_ENV]
})

axiosIns.interceptors.request.use(
	config => {
		console.log("请求拦截器")
		const token = authStore.token
		token && (config.headers.Authorization = token)
		return config
	},
	error => Promise.error(error))

axiosIns.interceptors.response.use(
	response => {
		if (response.data.code === 200) {     // 响应结果里的status: ok是我与后台的约定，大家可以根据实际情况去做对应的判断
			return Promise.resolve(response.data)
		} else {
			return Promise.reject(response.data.message)
		}
	},
	error => {
		if (error.response) {
			// 根据请求失败的http状态码去给用户相应的提示
			// let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message

			if (error.response.status === 401) {    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例

			}
			return Promise.reject(error)
		} else {
			console.log(error)
			return Promise.reject(new Error('请求超时, 请刷新重试'))
		}
	})

export const axios_get = (url, params, config = {}) => {
	return new Promise((resolve, reject) => {
		axiosIns({
			method: 'get',
			url,
			params,
			...config
		}).then(resp_data => {
			console.log('成功, resp_data', resp_data)
			resolve(resp_data.data)
		}).catch(error => {
			reject(error)
		})
	})
}

export const axios_post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		axiosIns({
			method: 'post',
			url,
			data,
			...config
		}).then(resp_data => {
			console.log('成功, resp_data', resp_data)
			resolve(resp_data.data)
		}).catch(error => {
			reject(error)
		})
	})
}
