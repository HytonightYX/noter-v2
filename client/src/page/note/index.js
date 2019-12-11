import React from 'react'
import './style.less'
import { Icon } from 'semantic-ui-react'
import ICON from '../../asset/icon'
import FixedBar from '../../component/FixedBar'

class Note extends React.Component {
	state = {

	}

	componentDidMount() {

	}


	render() {

		return (
			<div className="g-note">

				<div className="m-header">
					<div className="header-img">
						<img src="https://cdn.sspai.com/2019/12/09/8ced19435f4edbb2fad9ff293544e69b.jpg?imageMogr2/quality/95/thumbnail/!1420x708r/gravity/Center/crop/1420x708/interlace/1 " alt=""/>
					</div>

					<div className="title">
						Microsoft Terminal 颜值在线的终端模拟器
					</div>

					<div className="info">
						<div className="name">
							<span className="user-icon">
								<img src="https://lh3.googleusercontent.com/-vZSpiRJhlvI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcjKyDWqpqX0LDNnx5QTyPm8zHg2g/photo.jpg?sz=46" alt=""/>
							</span>
							<span className="name">
								HytonightYX
							</span>
						</div>
						<div className="time">1天前</div>
					</div>
				</div>

				<div className="content">

				</div>




				<FixedBar/>
			</div>
		)
	}
}

export default Note
