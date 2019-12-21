import React from 'react'
import './style.less'
import ICON from '../../asset/icon'
import FixedBar from '../../component/FixedBar'
import { axios_get, axios_post } from '../../util/axios'
import { FIND_MENU } from '../../constant/config'
import dayjs from 'dayjs'
import { tsFormat } from '../../util/date'

class Find extends React.Component {
	state = {
		currtab: 'all', // all || follow || hot || tag
		currNotes: [],
		loading: false
	}

	async componentDidMount() {
		const data = await axios_get('note')
		this.setState({currNotes: data})
	}

	/**
	 * 修改标签
	 */
	doChangeTab = (e) => {
		let key
		switch (e.target.innerText) {
			case '所有':
				key = 'all'
				break
			case '关注':
				key = 'follow'
				break
			case '最热':
				key = 'hot'
				break
			case '标签':
				key = 'tag'
				break
			default:
				key = 'all'
		}
		this.setState({currtab: key})
	}

	render() {

		const {currtab, currNotes} = this.state

		const NoteCard = ({note}) => (
			<div className="note-card">

				<div className="card-image">
					<img src="https://picsum.photos/900/300" alt=""/>
				</div>

				<div className="card-content">
					<div className="note-title">
						{note.title}
					</div>

					<div className="note-attr">

						<div className="user">
							<img className="user-icon"
							     src="https://cdn.sspai.com/2018/10/31/e66cabe8eb4d2b3025021d65881b494b.png?imageMogr2/quality/95/thumbnail/!200x200r/gravity/Center/crop/200x200"
							     alt=""/>
							<span className="username">{note.author}</span>
							<span className="update-time">{dayjs(note.updatedAt).format('MM月DD日')}</span>
						</div>

						<div className="like">
							<div><img src={ICON.bookmark} alt=""/><span>36</span></div>
							<div><img src={ICON.comment} alt=""/><span>2</span></div>
						</div>
					</div>
				</div>
			</div>
		)

		return (
			<div className="g-find">

				<div className="m-find-tab">
					<ul>
						{FIND_MENU.map(item =>
							<li key={item.key} onClick={this.doChangeTab}
							    className={`${currtab === item.key && 'active'}`}
							>{item.title}</li>
						)}
					</ul>
				</div>

				<div className="m-find">
					<div className="note-list">
						{currNotes.map((item, i) => <NoteCard key={`node-${i}`} note={item}/>)}
					</div>

					<div className="right-bar">

					</div>
				</div>

				<FixedBar/>
			</div>
		)
	}
}

export default Find
