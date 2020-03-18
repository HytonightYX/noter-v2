import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import LoginGuard from './component/LoginGuard'
import NavWrapper from './component/NavWrapper'
import WaitingComponent from './component/WaitingComponent'
import lazy from './util/lazy'

import './style/global.less'

const Find = lazy(() => import('./page/find'))
const Write = lazy(() => import('./page/write'))
const Profile = lazy(() => import('./page/profile'))
const Login = lazy(() => import('./page/login'))
const MyNote = lazy(() => import('./page/mynote'))
const Note = lazy(() => import('./page/note'))
const Edit = lazy(() => import('./page/edit'))
const Setting = lazy(() => import('./page/setting'))

import history from './history'

class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Router history={history}>
				<div className='app-root'>
					<NavWrapper />

					<div className="g-content">
						<LoginGuard>
							<Switch>
								<Route exact path='/' component={WaitingComponent(Find)} />
								<Route exact path='/login' component={WaitingComponent(Login)} />
								<Route exact path='/find' component={WaitingComponent(Find)} />
								<Route exact path='/write' component={WaitingComponent(Write)} />
								<Route exact path='/mynote' component={WaitingComponent(MyNote)} />
								<Route exact path='/profile' component={WaitingComponent(Profile)} />
								<Route exact path='/note/:id' component={WaitingComponent(Note)} />
								<Route exact path='/edit/:id' component={WaitingComponent(Edit)} />
								<Route exact path='/setting' component={WaitingComponent(Setting)} />
							</Switch>
						</LoginGuard>
					</div>

				</div>
			</Router>
		)
	}
}

export default App
