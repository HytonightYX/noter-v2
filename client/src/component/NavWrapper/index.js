import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Icon, Menu, Segment } from 'semantic-ui-react'

import { MENU_MAIN } from '../../constant/config'
import { Link } from 'react-router-dom'
import './style.less'

export default withRouter(({location}) => {
	return (
		<div className="g-nav-wrapper">
			<div className="m-nav">
				<Menu inverted pointing secondary size='large'>
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
					<div className="user-icon">
						<img src="https://cdn.sspai.com/2019/09/24/8edfbb9b9780595e2977e095c1ee128a.png?imageMogr2/quality/95/thumbnail/!72x72r/gravity/Center/crop/72x72/interlace/1" alt=""/>
					</div>

					<div>
						<Icon className="m-icon" name="search"/>
					</div>
				</div>
			</div>
		</div>
	)
})
