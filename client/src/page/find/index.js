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
import LazyLoad from 'react-lazyload'
import dayjs from 'dayjs'

class Find extends React.Component {
	state = {
		currtab: 'all', // all || follow || hot || tag
		currNotes: [],
		loading: false
	}

	async componentDidMount() {
		axios_get('note')
			.then(data => {
				this.setState({currNotes: data})
			})
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

		const {currtab, currNotes, loading} = this.state

		const NoteCard = ({note}) => (
			<div className="note-card">
				<div style={{width: 400}}>
					<LazyLoad
						height={200}
						once
						throttle={250}
						placeholder={
							<Placeholder style={{ height: 200, width: 400 }}>
								<Placeholder.Image />
							</Placeholder>
						}
					>
						<ImageLoader
							src={`https://picsum.photos/400/200?random=${Math.floor(Math.random() * 1000)}`}
						/>
					</LazyLoad>
				</div>

				<div className="card-content">
					<div className="note-title">
						<Link to={`/note/${note.id}`}>{note.title}</Link>
					</div>

					<div className="note-attr">

						<div className="user">
							<img className="user-icon"
							     src={note.avatar}
							     alt=""/>
							<span className="username">{note.user_name}</span>
							<span className="update-time">{dayjs(note.updatedAt).format('MM月DD日')}</span>
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
					{
						loading ?
							<Icon type="loading" style={{fontSize: 48}}/>
							:
							<div className="note-list">
								{currNotes.map((item, i) => <NoteCard key={`node-${i}`} note={item}/>)}
							</div>
					}

					<div className="right-bar">

					</div>
				</div>

				<FixedBar/>
			</div>
		)
	}
}

export default Find
