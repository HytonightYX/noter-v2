import { observable, action, reaction } from 'mobx'

class AuthStore {
	@observable
	token = window.localStorage.getItem('jwt')

	constructor() {
		reaction(
			() => this.token,
			token => {
				if (token) {
					console.log('SET JWT = '+ token)
					window.localStorage.setItem('jwt', token)
				} else {
					console.log('CLEAR JWT = ')
					window.localStorage.removeItem('jwt')
				}
			}
		)
	}

	@action
	setToken(token) {
		this.token = token
	}
}

export default new AuthStore()
