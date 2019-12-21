import React, { lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NavWrapper from './component/NavWrapper'

import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

import Find from './page/find'
import Write from './page/write'
import Note from './page/note'
import Profile from './page/profile'

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
							<Route exact path='/write' component={Write}/>
							<Route exact path='/note' component={Note}/>
							<Route exact path='/profile' component={Profile}/>
						</Switch>
					</div>

				</div>
			</Router>
		)
	}
}

export default App
