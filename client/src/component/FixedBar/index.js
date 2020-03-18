import React from 'react'
import './style.less'
import { Icon as SemiIcon } from 'semantic-ui-react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop)
		window.scrollTo(0, c - c / 8)
	}
}

export default () => (
	<div className="g-fixedbar">
		<Link to='/write'>
			<div
				className="m-icon m-red"
				onClick={() => {
				}}>
				<Icon type="edit" />
			</div>
		</Link>

		<div
			className="m-icon m-grey"
			onClick={() => {
				scrollToTop()
			}}
		>
			<SemiIcon name="arrow up" />
		</div>
	</div>
)
