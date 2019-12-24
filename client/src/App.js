import React, { lazy } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Loadable from './component/Loadable'

import LoginGuard from './component/LoginGuard'
import NavWrapper from './component/NavWrapper'
import ComLazy from './component/ComLazy'

import 'semantic-ui-css/semantic.min.css'
import './style/global.less'

import Find from './page/find'
import Write from './page/write'
import Note from './page/note'
import Profile from './page/profile'
import Login from './page/login'
import MyNote from './page/mynote'
import Edit from './page/edit'
import Setting from './page/setting'

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
								<Route exact path='/' component={Loadable({ loader: () => import('./page/find')})}/>
								<Route exact path='/login' component={ComLazy(Login)}/>
								<Route exact path='/find' component={ComLazy(Find)}/>
								<Route exact path='/write' component={ComLazy(Write)}/>
								<Route exact path='/note' component={ComLazy(Note)}/>
								<Route exact path='/mynote' component={ComLazy(MyNote)}/>
								<Route exact path='/profile' component={ComLazy(Profile)}/>
								<Route exact path='/note/:id' component={ComLazy(Note)}/>
								<Route exact path='/edit/:id' component={ComLazy(Edit)}/>
								<Route exact path='/setting' component={ComLazy(Setting)}/>
							</Switch>
						</LoginGuard>
					</div>

				</div>
			</Router>
		)
	}
}

export default App
