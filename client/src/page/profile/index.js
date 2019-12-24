import { Divider, Icon } from 'antd'
import { computed } from 'mobx'
import {message} from 'antd'
import { inject, observer } from 'mobx-react'
import React from 'react'
import './style.less'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { axios_get } from '../../util/axios'

@inject('userStore')
@observer
class Profile extends React.Component {

	state = {
		data: [],
		value: [],
		fetching: false,
		status: {}
	}

	componentDidMount() {
		axios_get('user/status')
			.then(data => this.setState({status: data}))
	}

	@computed
	get currUser() {
		return this.props.userStore.currUser
	}

	render() {
		const {status} = this.state

		if (!this.currUser) {
			message.info('请先登录!', 0.7)
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
								<div className="m-name">
									<span className="username">
										{this.currUser.userName}
									</span>

									<Link to='/setting'><button className="btn-edit">编辑</button></Link>
								</div>

								<Divider />

								<div className="m-status">BIO: {this.currUser.desc}</div>
							</div>
						</div>
					</div>
					<div className="right-side">
						<div className="title">成就</div>
						<div className="time"><Icon type="bar-chart" />文章 {status.noteNum} · 被赞 {status.likeNum} · 被收藏 {status.collectNum}</div>
						<div className="time"><Icon type="user" />您成为本站会员 1 天</div>
					</div>
				</div>
			</div>
		)
	}

}

export default Profile
