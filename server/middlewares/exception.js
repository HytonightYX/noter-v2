const { HttpException } = require('../core/httpException')

/**
 * 全局捕获异常中间件
 * @param ctx
 * @param next
 */
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
				code: error.code,
				data: error.data,
				message: error.message,
			}

			switch (error.code) {
				case 403:
				case 404:
					ctx.status = error.code
					break
				case 400:
					ctx.status = 666
					break	
				default:
					ctx.status = 200
			}

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
