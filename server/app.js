const Koa = require('koa')
const cors = require('@koa/cors')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')
// const koaStatic = require('koa-static')

const app = new Koa()

require('./app/models/user')
require('./app/models/classic')
require('./app/models/flow')

app.use(cors())
app.use(bodyParser())
// app.use(koaStatic('./upload'))
app.use(catchError)

InitManager.initCore(app)

if (global.config.env === 'dev') {
	console.log('current env: dev')
}

app.listen(3030, () => {
	console.log('PORT has opened on 3030')
})

