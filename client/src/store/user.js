import { action, observable, reaction, runInAction } from 'mobx'
import { axios_get, axios_post } from '../util/axios'

class UserStore {
	constructor() {
		reaction(
			() => this.token,
			token => {
				if (token) {

					window.localStorage.setItem('token', token)
				} else {

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
					window.location.href = '/'
				})

			})
			.finally(() => {
				runInAction(() => {
					this.loading = false
				})
			})
	}

	@action
	loginWithToken() {
		this.loading = true
		axios_get('user/info')
			.then(data => {
				runInAction(() => {
					this.currUser = data
					this.loading = false

				})
			})
	}

	@action
	logout() {
		this.currUser = null
		this.token = null
	}

	@action
	setToken(token) {
		this.token = token
	}
}

export default new UserStore()
