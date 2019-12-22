import { inject, observer } from 'mobx-react'
import React from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router'
import { axios_get } from '../../util/axios'

@withRouter
@inject('userStore')
@observer
class LoginGuard extends React.Component {
	state = {
		loading: false
	}

	async componentDidMount() {
		const code = queryString.parse(this.props.location.search).code
		console.log(code ? code : 'nocode')
		if (code) {
			this.setState({loading: true})
			const r = await axios_get('token/github?code=' + code)
			console.log(r)
			this.setState({loading: false})
		}
	}

	render() {
		const {loading} = this.state
		return (
			<>
				{loading ? <div>LOADING...</div> : this.props.children}
			</>
		)
	}

}

export default LoginGuard
