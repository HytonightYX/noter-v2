import { Divider } from 'antd'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import './style.less'
import { Redirect } from 'react-router'

@inject('userStore')
@observer
class Profile extends React.Component {

	state = {
		data: [],
		value: [],
		fetching: false
	}

	@computed
	get currUser() {
		return this.props.userStore.currUser
	}

	render() {
		console.log(this.currUser)

		if (!this.currUser) {
			message.info('请先登录!')
			return <Redirect to='login' />
		}

		return (
			<div className="g-profile">
				<div className="m-container">

					<div className="user-content">
						<div className="user-panel">
							<div className="user-icon">
								<img src={this.currUser.avatar} alt=""/>
							</div>

							<div className="user-info">
								<div>
									<span className="username">
										{this.currUser.userName}
									</span>

									<button className="btn-edit">编辑</button>
								</div>

								<Divider />

								<span>文章 1 · 被赞 0</span>
							</div>
						</div>
					</div>

					<div className="right-side">
						right
					</div>
				</div>
			</div>
		)
	}

}

export default Profile
