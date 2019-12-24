import { Icon, Spin } from 'antd'
import React from 'react'
import './style.less'
import { Link } from 'react-router-dom'
import { Placeholder } from 'semantic-ui-react'
import ICON from '../../asset/icon'
import FixedBar from '../../component/FixedBar'
import ImageLoader from '../../component/ImageLoader'
import { axios_get } from '../../util/axios'
import { FIND_MENU } from '../../constant/config'
import { SYSTEM_CONFIG } from '../../constant/config'
import LazyLoad from 'react-lazyload'
import dayjs from 'dayjs'

const {BASE_QINIU_URL} = SYSTEM_CONFIG.qiniu

class MyNote extends React.Component {
	state = {
		myNotes: [],
		loading: false
	}

	async componentDidMount() {
		this.setState({loading: true})
		axios_get('note/mine')
			.then(data => {
				this.setState({myNotes: data.notes, loading: false})
			})
	}

	doDel = (nid) => {
		axios_get('note/delete/' + nid)
			.then(data => {
				if (data && data.ok === 1) {
					axios_get('note/mine')
						.then(data => {
							this.setState({myNotes: data.notes})
						})
				}
			})
	}

	render() {
		const {myNotes, loading} = this.state
		const NoteCard = ({note}) => (
			<div className="note-card">
				<div style={{width: 400, overflow: 'hidden'}}>
					<LazyLoad
						height={200}
						once
						throttle={250}
						placeholder={
							<Placeholder style={{height: 200, width: 400}}>
								<Placeholder.Image/>
							</Placeholder>
						}
					>
						<ImageLoader
							src={note.cover ? BASE_QINIU_URL + note.cover + '?imageslim' : `https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`}
						/>
					</LazyLoad>
				</div>

				<div className="card-content">
					<div className="note-title">
						<Link to={`/note/${note.id}`}>{note.title}</Link>
					</div>

					<div className="note-attr">

						<div className="left">
							<Link to={`/edit/${note.id}`}><span>编辑</span></Link>
							<span onClick={this.doDel.bind(this, note.id)}>删除</span>
						</div>

						<div className="like">
							<div><img src={ICON.bookmark} alt=""/><span>{note.like_num}</span></div>
							<div><img src={ICON.comment} alt=""/><span>{note.collect_num}</span></div>
						</div>
					</div>
				</div>

			</div>
		)

		return (
			<div className="g-find">
				<div className="m-find">
					<Spin spinning={loading} indicator={<Icon type="loading" style={{fontSize: 32, color: '#fd281a'}}/>}>
						<div className="note-list">
							{myNotes.map((item, i) => <NoteCard key={`node-${i}`} note={item}/>)}
						</div>
					</Spin>

					<div className="right-bar">

					</div>
				</div>

				<FixedBar/>
			</div>
		)
	}
}

export default MyNote
