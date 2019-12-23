import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Form, Input as AntInput, Button, Select, Spin, Icon } from 'antd'
import './style.less'
import OauthPopup from 'react-oauth-popup'
import { GITHUB_LOGIN } from '../../constant/api'
import { axios_get } from '../../util/axios'

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

	onCode = (code) => console.log("wooooo a code", code);

	render() {
		const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form

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
