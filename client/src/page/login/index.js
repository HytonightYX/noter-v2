import * as React from 'react'
import { Form, Button, Icon } from 'antd'
import './style.less'
import { GITHUB_LOGIN } from '../../constant/api'

@Form.create()
class Login extends React.Component {

	state = {
		data: [],
		value: [],
		fetching: false,
		submitting: false
	}

	doGithubLogin = () => {
		window.location.href = GITHUB_LOGIN
	}

	render() {
		const {getFieldDecorator} = this.props.form

		return (
			<div className="g-login">
				<div className="m-login">
					<Form onSubmit={this.handleSubmit} className="m-form">
						<Form.Item>
							{getFieldDecorator('image', {
								rules: [{required: false, message: '请上传题图'}],
								initialValue: ''
							})(
								<Button className="m-btn" onClick={this.doGithubLogin}><Icon type="github" />Github 一键登录</Button>
							)}
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default Login
