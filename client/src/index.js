import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import injects from './store'
import { Provider } from 'mobx-react'

import { configure } from 'mobx'

configure({enforceActions: 'observed'})

ReactDOM.render(
	<Provider {...injects}>
		<App/>
	</Provider>,
	document.getElementById('root')
)

serviceWorker.unregister()
