import React, { lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import NavWrapper from './component/NavWrapper'
import FixedBar from './component/FixedBar'
import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

import Find from './page/find'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Router>
				<div className='app-root'>
					<NavWrapper/>

					<div className="g-content">
						<Switch>
							<Route exact path='/' component={Find}/>
							<Route exact path='/find' component={Find}/>
						</Switch>
					</div>
					<FixedBar/>
				</div>
			</Router>
		)
	}
}

export default App
