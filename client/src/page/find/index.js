import React from 'react'
import './style.less'
import { Icon } from 'semantic-ui-react'
import ICON from '../../asset/icon'
import FixedBar from '../../component/FixedBar'

const FIND_MENU = [
	{title: '所有', key: 'all', icon: ''},
	{title: '关注', key: 'follow', icon: ''},
	{title: '最热', key: 'hot', icon: ''},
]

class Find extends React.Component {
	state = {
		currtab: 'all' // all || follow || hot
	}

	componentDidMount() {

	}

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
			default:
				key = 'all'
		}
		this.setState({currtab: key})
	}

	render() {

		const {currtab} = this.state

		const TEMPC = () => (
			<div className="note-card">

				<div className="card-image">
					<img src="https://picsum.photos/900/300" alt=""/>
				</div>

				<div className="card-content">
					<div className="note-title">
						一周 App 派评 | 近期值得关注的 14 款应用
					</div>

					<div className="note-attr">

						<div className="user">
							<img className="user-icon"
							     src="https://cdn.sspai.com/2018/10/31/e66cabe8eb4d2b3025021d65881b494b.png?imageMogr2/quality/95/thumbnail/!200x200r/gravity/Center/crop/200x200"
							     alt=""/>
							<span className="username">老胡胡胡胡</span>
							<span className="update-time">3小时前</span>
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
						<TEMPC/>
						<TEMPC/>
						<TEMPC/>
						<TEMPC/>
						<TEMPC/>
						<TEMPC/>
						<TEMPC/>
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
