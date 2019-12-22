import { action, observable } from 'mobx'
import { axios_post } from '../util/axios'

class UserStore {
	@observable
	currUser = null

	@action
	async login(params) {
		this.currUser = axios_post('user/login', params)
	}

	@action
	logout() {
		this.currUser = null
	}
}

export default new UserStore()
