import { Icon, Spin } from 'antd'
import React, { Suspense } from 'react'
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
import { dateToFromNow } from '../../util/date'

const {BASE_QINIU_URL} = SYSTEM_CONFIG.qiniu

class Find extends React.Component {
	state = {
		currtab: 'all', // all || follow || hot || tag
		currNotes: [],
		loading: false,
		fetchingNote: false,
		hotList: [],
		tagList: []
	}

	async componentDidMount() {
		this.setState({fetchingNote: true})
		axios_get('note/list')
			.then(data => {
				this.setState({currNotes: data, fetchingNote: false})
			})

		axios_get('note/hot')
			.then(data => {
				this.setState({hotList: data})
			})

		axios_get('tag')
			.then(data => {
				this.setState({tagList: data})
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
			case '标签':
				key = 'tag'
				break
			default:
				key = 'all'
		}

		if (key === 'all') {
			axios_get('note/list')
				.then(data => {
					this.setState({currNotes: data, fetchingNote: false})
				})
		}

		this.setState({currtab: key})
	}

	doSearch = (id) => {
		axios_get('note/byTag/' + id)
			.then(data => {
				this.setState({
					currNotes: data.data
				})
			})
	}

	render() {
		const {currtab, currNotes, loading, fetchingNote, hotList, tagList} = this.state

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

						<div className="user">
							<img className="user-icon"
							     src={note.avatar}
							     alt=""/>
							<span className="username">{note.user_name}</span>
							<span className="update-time">{dateToFromNow(note.created_at)}</span>
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
			<Suspense fallback={<div>Loading...</div>}>
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
								<Spin spinning={fetchingNote}
								      indicator={<Icon type="loading" style={{fontSize: 32, color: '#fd281a'}}/>}>
									{currtab === 'tag' && (
										<div className="m-tags-wrap">
											{tagList.map(tag => {
												return <div className="m-tag" key={'tab' + tag.name}
												            onClick={this.doSearch.bind(this, tag.id)}># <span>{tag.name}</span></div>
											})}
										</div>
									)}

									<div className="note-list">
										{currtab === 'all' && currNotes.map((item, i) => <NoteCard key={`node-${i}`} note={item}/>)}
										{currtab === 'tag' && currNotes.map((item, i) => <NoteCard key={`node-${i}`} note={item}/>)}
										{currNotes.length === 0 && (
											<div className="no-data">没有更多数据 😯</div>
										)}
									</div>
								</Spin>
						}

						<div className="find-right-bar">
							<div className="title">
								最热 · 精选
							</div>

							<div className="hot-list">
								{hotList.map(item => (
									<div className="item" key={'hot-' + item.id}>
										<div className="avatar">
											<img src={item.avatar} alt=""/>
										</div>

										<div className="info">
											<div className="item-name">{item.user_name}</div>
											<Link to={'note/' + item.id}>
												<span className="item-title">{item.title}</span>
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<FixedBar/>
				</div>
			</Suspense>
		)
	}
}

export default Find
