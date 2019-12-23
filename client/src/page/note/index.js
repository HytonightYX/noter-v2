import React from 'react'
import './style.less'
import { withRouter } from 'react-router'
import FixedBar from '../../component/FixedBar'
import { axios_get } from '../../util/axios'
import { SYSTEM_CONFIG } from '../../constant/config'
const {BASE_QINIU_URL} = SYSTEM_CONFIG.qiniu
@withRouter
class Note extends React.Component {
	state = {
		note: {}
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
							src={ note.cover ? BASE_QINIU_URL + note.cover + '?imageslim' : 'https://picsum.photos/600/300'}
							alt=""/>
					</div>

					<div className="title">
						{note && note.title}
					</div>

					<div className="info">
						<div className="name">
							<span className="user-icon">
								<img src={note && note.avatar} alt=""/>
							</span>
							<span className="name">
								{note && note.user_name}
							</span>
						</div>
						<div className="time">{note.updated_at}</div>
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
