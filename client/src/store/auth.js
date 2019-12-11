import { observable, action, reaction } from 'mobx'

class AuthStore {
	@observable
	token = window.localStorage.getItem('jwt')

	constructor() {
		reaction(
			() => this.token,
			token => {
				if (token) {
					console.log('在localStorage中设置了jwt '+ token)
					window.localStorage.setItem('jwt', token)
				} else {
					console.log('在localStorage中清除jwt ')
					window.localStorage.removeItem('jwt')
				}
			}
		)
	}

	@action setToken(token) {
		this.token = token
	}
}

export default new AuthStore()
