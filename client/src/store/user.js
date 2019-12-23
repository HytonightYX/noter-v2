import { action, observable, reaction, runInAction } from 'mobx'
import { axios_get, axios_post } from '../util/axios'

class UserStore {
	constructor() {
		reaction(
			() => this.token,
			token => {
				if (token) {
					console.log('SET TOKEN = '+ token)
					window.localStorage.setItem('token', token)
				} else {
					console.log('CLEAR TOKEN = ')
					window.localStorage.removeItem('token')
				}
			}
		)
	}

	@observable
	currUser = null

	@observable
	token = window.localStorage.getItem('token')

	@observable
	loading = false

	@action
	login(code) {
		this.loading = true
		axios_get('token/github?code=' + code)
			.then(data => {
				runInAction(() => {
					this.currUser = data.user
					this.token = data.token
					window.localStorage.setItem('token', data.token)
				})
				console.log(data)
			})
			.catch(e => {
				alert('cuowu')
			})
			.finally(() => {
				runInAction(() => {
					this.loading = false
				})
			})
	}

	@action
	logout() {
		this.currUser = null
		this.token = 'logout'
	}

	@action
	setToken(token) {
		this.token = token
	}
}

export default new UserStore()
