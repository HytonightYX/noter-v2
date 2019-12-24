import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router'
import { Spin, Icon } from 'antd'

@withRouter
@inject('userStore')
@observer
class LoginGuard extends React.Component {
	@computed
	get loading() {
		return this.props.userStore.loading
	}

	UNSAFE_componentWillMount() {
		const code = queryString.parse(this.props.location.search).code
		const token = window.localStorage.getItem('token')
		if (code) {
			this.props.userStore.login(code)
		} else if (token) {
			// 该用户尚未登出, 保持登录状态

			this.props.userStore.loginWithToken()
		}
	}

	render() {
		return (
			<>
				{this.loading ?
					<div className="g-login_guard">
						<Spin indicator={<Icon type="loading" style={{fontSize: 48}}/>} tip='拉取用户信息...'/>
					</div> : this.props.children}
			</>
		)
	}
}

export default LoginGuard
