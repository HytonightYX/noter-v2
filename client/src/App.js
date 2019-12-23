import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import LoginGuard from './component/LoginGuard'
import NavWrapper from './component/NavWrapper'

import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

import Find from './page/find'
import Write from './page/write'
import Note from './page/note'
import Profile from './page/profile'
import Login from './page/login'
import MyNote from './page/mynote'

import history from './history'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Router history={history}>
				<div className='app-root'>
					<NavWrapper/>

					<div className="g-content">
						<LoginGuard>
							<Switch>
								<Route exact path='/' component={Find}/>
								<Route exact path='/login' component={Login}/>
								<Route exact path='/find' component={Find}/>
								<Route exact path='/write' component={Write}/>
								<Route exact path='/note' component={Note}/>
								<Route exact path='/mynote' component={MyNote}/>
								<Route exact path='/profile' component={Profile}/>
								<Route exact path='/note/:id' component={Note}/>
							</Switch>
						</LoginGuard>
					</div>

				</div>
			</Router>
		)
	}
}

export default App
