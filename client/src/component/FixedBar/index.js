import React from 'react'
import './style.less'
import { Icon as SemiIcon } from 'semantic-ui-react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

export default () => (
	<div className="g-fixedbar">
		<Link to='/write'>
			<div
				className="m-icon m-red"
				onClick={() => {
				}}>
				<Icon type="edit"/>
			</div>
		</Link>

		<div
			className="m-icon m-grey"
			onClick={() => {
				window.scrollTo(0, 0)
			}}
		>
			<SemiIcon name="arrow up"/>
		</div>
	</div>
)
