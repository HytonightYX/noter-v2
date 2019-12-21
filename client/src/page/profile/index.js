import React from 'react'
import './style.less'

class Profile extends React.Component {

	state = {
		data: [],
		value: [],
		fetching: false
	}


	render() {

		return (
			<div className="g-profile">
				<div className="m-container">

					<div className="user-content">
						user
					</div>

					<div className="right-side">
						right
					</div>
				</div>
			</div>
		)
	}

}

export default Profile
