import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Input } from 'semantic-ui-react'
import BraftEditor from 'braft-editor'
import { Form, Input as AntInput, Button, Icon, Select, Spin, message } from 'antd'
import debounce from 'lodash/debounce'

import 'braft-editor/dist/index.css'
import './style.less'
import { axios_get, axios_post } from '../../util/axios'

const {Option} = Select

@Form.create()
@inject('authStore')
@observer
class Write extends React.Component {
	constructor(props) {
		super(props)
		this.lastFetchId = 0
		this.fetchUser = debounce(this.fetchUser, 800)
	}

	state = {
		data: [],
		value: [],
		fetching: false,
		submitting: false
	}

	componentDidMount() {
		axios_post('token', {
			account: '18196777756@163.com',
			secret: '123qwe',
			type: 101
		}).then(data => {
			console.log(data)
			this.props.authStore.setToken(data.token)
		})
	}

	fetchUser = value => {
		console.log('fetching user', value)
		this.lastFetchId += 1
		const fetchId = this.lastFetchId
		this.setState({data: [], fetching: true})
		fetch('https://randomuser.me/api/?results=5')
			.then(response => response.json())
			.then(body => {
				if (fetchId !== this.lastFetchId) {
					// for fetch callback order
					return
				}
				const data = body.results.map(user => ({
					text: `${user.name.first} ${user.name.last}`,
					value: user.login.username,
				}))
				this.setState({data, fetching: false})
			})
	}

	handleChange = value => {
		this.setState({
			value,
			data: [],
			fetching: false,
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.form.validateFields((error, values) => {
			if (!error) {
				console.log(values)
				const submitData = {
					title: values.title,
					raw: values.content.toRAW(),
					html: values.content.toHTML(),
					tag: ['大一', '高数'].join(','),
					author: 25,
					status: 2
				}

				this.setState({submitting: true})
				axios_post('note/add', submitData)
					.then(data => {
						console.log(data)
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
		const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form
		const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
		const {fetching, data, value, submitting} = this.state

		return (
			<div className="g-write">
				<Form onSubmit={this.handleSubmit} className="m-form">

					<Form.Item style={{marginBottom: 0}}>
						{getFieldDecorator('image', {
							rules: [{required: false, message: '请上传题图'}],
							initialValue: ''
						})(
							<div className="upload">
								<div style={{background: '#666666', width: 600, height: 250, margin: '20px auto 30px'}}>

								</div>
							</div>
						)}
					</Form.Item>

					<Form.Item style={{marginBottom: 5}}>
						{getFieldDecorator('title', {
							rules: [{required: true, message: '请输入标题'}],
							initialValue: ''
						})(
							<AntInput
								className="title-input"
								placeholder="请输入标题"
							/>,
						)}
					</Form.Item>

					<Form.Item>
						{getFieldDecorator('content', {
							validateTrigger: 'onBlur',
							rules: [{
								required: true,
								validator: (_, value, callback) => {
									if (value.isEmpty()) {
										callback('请输入正文内容')
									} else {
										callback()
									}
								}
							}],
						})(
							<BraftEditor
								ref={instance => this.editorInstance = instance}
								className="m-editor"
								placeholder="请输入正文内容"
							/>
						)}
					</Form.Item>

					<Form.Item className="m-flex-row">
						<Select
							size="large"
							mode="multiple"
							labelInValue
							value={value}
							placeholder="选择标签..."
							notFoundContent={fetching ? <Spin size="small"/> : null}
							filterOption={false}
							onSearch={this.fetchUser}
							onChange={this.handleChange}
							style={{width: '400px'}}
						>
							{data.map(d => (
								<Option key={d.value}>{d.text}</Option>
							))}
						</Select>
						<Button size="large" htmlType="submit" loading={submitting}>提交</Button>
					</Form.Item>
				</Form>
			</div>
		)
	}
}

export default Write
