import React from 'react'
import './style.less'
import bookmark from './bookmark.png'
import collected from './collected.png'
import like from './like.png'
import liked from './liked.png'

export default (props) => {
	let hasCollected = (props.status && props.status.collect)

	return (
		<div className="g-notebar">
			<div
				className="m-icon"
				onClick={props.doLike}
			>
				<img style={{height: 18}} src={(props.status && props.status.like) ? liked : like} alt=""/>
			</div>

			<div
				className="m-icon"
				onClick={props.doCollect}
			>
				<img style={{height: hasCollected ? 42 : 28}}
				     src={(props.status && props.status.collect) ? collected : bookmark} alt=""/>
			</div>
		</div>
	)
}
