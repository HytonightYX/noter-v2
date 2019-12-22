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
		if (code) {
			this.props.userStore.login(code)
		}
	}

	render() {
		return (
			<>
				{this.loading ?
					<div className="g-login_guard">
						<Spin indicator={<Icon type="loading" style={{fontSize: 48}}/>}/>
					</div> : this.props.children}
			</>
		)
	}
}

export default LoginGuard
