import axios from 'axios'
import { message } from 'antd'
import { encodeJWT } from './token'

const BASE_URL = {
	development: 'http://localhost:3030/v1/',
	production: 'http://yunxi.site:3030/v1/'
}

const axiosIns = axios.create({
	timeout: 20000,
	baseURL: BASE_URL[process.env.NODE_ENV]
})

/**
 * 请求拦截器
 */
axiosIns.interceptors.request.use(
	config => {
		const token = window.localStorage.getItem('token')
		token && (config.headers.Authorization = encodeJWT(token))
		return config
	},
	error => Promise.error(error)
)

/**
 * 响应拦截器
 */
axiosIns.interceptors.response.use(
	response => {
		if (response.data.code === 200) {
			return Promise.resolve(response.data)
		} else {
			return Promise.reject(response.data.message)
		}
	},
	error => {
		// 这里的错误均为网络错误，非具体业务错误
		if (error.response) {
			return Promise.reject(error)
		} else {
			return Promise.reject(new Error('请求超时, 请刷新重试'))
		}
	}
)

export const axios_get = (url, params = {}, config = {}) => {
	return new Promise((resolve) => {
		axiosIns({
			method: 'get',
			url,
			params,
			...config
		}).then(resp_data => {
			resp_data.message && message.success(resp_data.message, 0.7)
			resolve(resp_data.data)
		}).catch(error => {
			if (error.response && error.response.status === 403) {
				message.error('令牌不合法，请登录！', 0.7)
				setTimeout(() => {
					window.location.href = '/login'
				}, 1000)
			} else if (error.response && error.response.status === 666) {
				message.error(error.response.data.message, 0.7)
			} else {
				message.error(error.message, 0.7)
			}
		})
	})
}

export const axios_post = (url, data, config = {}) => {
	return new Promise((resolve) => {
		axiosIns({
			method: 'post',
			url,
			data,
			...config
		}).then(resp_data => {
			resp_data.message && message.success(resp_data.message, 0.7)
			resolve(resp_data.data)
		}).catch(error => {
			message.error(error.message, 0.7)
		})
	})
}
