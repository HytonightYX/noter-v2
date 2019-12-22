import axios from 'axios'
import { message } from 'antd'
import authStore from '../store/index'
import { encodeJWT } from './token'

const BASE_URL = {
	// development: 'http://127.0.0.1:3030/v1/',
	development: 'http://172.22.203.70:3030/v1/',
	production: 'http://yunxi.site:3030'
}

const axiosIns = axios.create({
	timeout: 200000,
	baseURL: BASE_URL[process.env.NODE_ENV]
})

/**
 * 请求拦截器
 */
axiosIns.interceptors.request.use(
	config => {
		const token = authStore.token || window.localStorage.getItem('jwt')
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
			// 根据请求失败的 http 状态码去给用户相应的提示
			// let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message

			if (error.response.status === 302) {
				console.log(error.response.data)
			}

			// 资源不存在
			if (error.response.status === 404) {
				message.error('404: 资源获取失败', 0.7)
			}

			// token或者登陆失效情况下跳转到登录页面
			if (error.response.status === 401) {
				console.log('token或者登陆失效情况下跳转到登录页面')
			}

			return Promise.reject(error)
		} else {
			console.log(error)
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
			message.error(error.message, 0.7)
			console.log('axios_get:', error)
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
			message.error(error, 0.7)
			console.log('axios_post:', error)
		})
	})
}
