const Koa = require('koa')
const cors = require('@koa/cors')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')

const app = new Koa()

require('./app/models/user')

app.use(cors())
app.use(bodyParser())
app.use(catchError)

InitManager.initCore(app)

if (global.config.env === 'dev') {
	console.log('current env: dev')
}

app.listen(3030, () => {
	console.log('PORT has opened on 3030')
})

