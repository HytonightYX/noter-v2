const {HttpException} = require('../core/httpException')

const catchError = async (ctx, next) => {
	try {
		await next()
	} catch (error) {

		const isHttpException = error instanceof HttpException
		const isDev = global.config.env === 'dev'

		if (!isHttpException && !isDev) {
			throw error
		}

		if (error instanceof HttpException) {
			ctx.body = {
				message: error.message,
				error_code: error.errorCode,
				request: `${ctx.method} ${ctx.path}`
			}
			ctx.status = error.code
		} else {
			ctx.body = {
				message: '捕获到未知异常:\n' + error.stack,
				error_code: 999,
				request: `${ctx.method} ${ctx.path}`,
			}
			ctx.status = 500
		}
	}
}

module.exports = catchError
