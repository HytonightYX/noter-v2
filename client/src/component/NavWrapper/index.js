import { Dropdown, Menu as AntMenu } from 'antd'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Icon, Menu } from 'semantic-ui-react'
import { MENU_MAIN } from '../../constant/config'
import { Link } from 'react-router-dom'
import logo from '../../asset/img/logo-nobg-64.png'
import './style.less'

const menu = (
	<AntMenu>
		<AntMenu.Item>
			<Link to='/profile'>
				<div>个人主页</div>
			</Link>
		</AntMenu.Item>
		<AntMenu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
				账号设置
			</a>
		</AntMenu.Item>
		<AntMenu.Item>
			<a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
				退出登录
			</a>
		</AntMenu.Item>
	</AntMenu>
)

export default withRouter(inject('userStore')(observer((props) => {

	const currUser = props.userStore.currUser

	return (
		<div className="g-nav-wrapper">
			<div className="m-nav">
				<Menu inverted pointing secondary size='large'>
					<div className="m-logo">
						<img src={logo} alt=""/>
					</div>
					{
						MENU_MAIN.map(item => (
							<Link to={item.path} key={item.title}>
								<Menu.Item
									icon={<Icon name={item.icon}/>}
									name={item.title}
									active={item.path === location.pathname}
								/>
							</Link>
						))
					}
				</Menu>

				<div className="nav-right">
					<div>
						<Icon className="m-icon" name="search"/>
					</div>

					{currUser && <Dropdown
							overlay={menu}
							placement="bottomCenter"
							overlayClassName="m-header-dropdown"
						>
							<div className="user-icon">
								<img
									src="https://cdn.sspai.com/2019/09/24/8edfbb9b9780595e2977e095c1ee128a.png?imageMogr2/quality/95/thumbnail/!72x72r/gravity/Center/crop/72x72/interlace/1"
									alt=""/>
							</div>
						</Dropdown>}

					{!currUser && <Link to='/login'><button className="m-login_btn">登录</button></Link>}
				</div>
			</div>
		</div>
	)
})))
