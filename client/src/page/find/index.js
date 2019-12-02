import React from 'react'
import './style.less'

class Find extends React.Component {
	state = {

	}

	componentDidMount() {
	}

	render() {

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

						</div>

						<div className="like">

						</div>
					</div>
				</div>
			</div>
		)

		return (
			<div className="g-find">
				<div className="note-list">

					<TEMPC />
					<TEMPC />
					<TEMPC />
					<TEMPC />
					<TEMPC />
					<TEMPC />
					<TEMPC />

				</div>

				<div className="right-bar">

				</div>
			</div>
		)
	}
}

export default Find
