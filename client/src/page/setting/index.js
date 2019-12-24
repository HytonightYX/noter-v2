import { Button, Form, Input as AntInput, message, Select, Spin, Upload } from 'antd'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import './style.less'
import { axios_get, axios_post } from '../../util/axios'

const {Option} = Select

@Form.create()
@inject('userStore')
@observer
class Setting extends React.Component {

	state = {
		submitting: false
	}

	@computed
	get currUser() {
		return this.props.userStore.currUser
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.form.validateFields((error, values) => {
			if (!error) {
				const submitData = {...values}

				this.setState({submitting: true})
				axios_post('user/modify', submitData)
					.then(data => {
						if (data && data.ok === 1) {
							setTimeout(() => {
								window.location.href = '/profile'
							}, 1000)
						}
					})
					.finally(() => {
						this.setState({submitting: false})
					})
			} else {
				message.error('提交发生错误')
			}
		})
	}

	render() {
		const {submitting} = this.state
		const {getFieldDecorator} = this.props.form

		return (
			<div className="g-setting">
				<div className="m-title">账号设置</div>

				<Form onSubmit={this.handleSubmit} className="m-setting-form">
					<div className="m-form">
						<Form.Item style={{marginBottom: 10}} label='用户名'>
							{getFieldDecorator('userName', {
								initialValue: this.currUser.userName || ''
							})(
								<AntInput
									size="large"
									placeholder="用户名"
								/>,
							)}
						</Form.Item>

						<Form.Item style={{marginBottom: 10}} label='常用邮箱'>
							{getFieldDecorator('email', {
								initialValue: this.currUser.email || ''
							})(
								<AntInput
									size="large"
									placeholder="常用邮箱"
								/>,
							)}
						</Form.Item>

						<Form.Item style={{marginBottom: 10}} label='真实姓名'>
							{getFieldDecorator('realName', {
								initialValue: this.currUser.realName || ''
							})(
								<AntInput
									size="large"
									placeholder="真实姓名"
								/>,
							)}
						</Form.Item>

						<Form.Item style={{marginBottom: 10}} label='个人简介'>
							{getFieldDecorator('desc', {
								initialValue: this.currUser.desc || ''
							})(
								<AntInput
									size="large"
									placeholder="个人简介"
								/>,
							)}
						</Form.Item>
					</div>

					<div style={{textAlign: 'center'}}>
						<Button size="large" className="setting-save" htmlType="submit" loading={submitting}>保存</Button>
					</div>
				</Form>

			</div>
		)
	}
}

export default Setting
