import React from 'react'
import './style.less'
import { withRouter } from 'react-router'
import FixedBar from '../../component/FixedBar'
import { axios_get } from '../../util/axios'

@withRouter
class Note extends React.Component {
	state = {
		note: null
	}

	componentDidMount() {
		const noteId = this.props.match.params.id
		this.setState({loading: true})
		axios_get('note/' + noteId)
			.then(data => {
				this.setState({note: data})
			})
			.finally(() => this.setState({loading: false}))
	}

	render() {
		const {note} = this.state
		return (
			<div className="g-note">

				<div className="m-header">
					<div className="header-img">
						<img
							src="https://cdn.sspai.com/2019/12/09/8ced19435f4edbb2fad9ff293544e69b.jpg?imageMogr2/quality/95/thumbnail/!1420x708r/gravity/Center/crop/1420x708/interlace/1 "
							alt=""/>
					</div>

					<div className="title">
						{note && note.title}
					</div>

					<div className="info">
						<div className="name">
							<span className="user-icon">
								<img
									src="https://lh3.googleusercontent.com/-vZSpiRJhlvI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcjKyDWqpqX0LDNnx5QTyPm8zHg2g/photo.jpg?sz=46"
									alt=""/>
							</span>
							<span className="name">
								HytonightYX
							</span>
						</div>
						<div className="time">1天前</div>
					</div>
				</div>

				<div className="content">
					<div className="braft-output-content" dangerouslySetInnerHTML={{__html: note && note.html}}/>
				</div>

				<FixedBar/>
			</div>
		)
	}
}

export default Note
