const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
	constructor(level) {
		this.level = level || 1

		Auth.USER = 8
		Auth.ADMIN = 16
		Auth.SUPER_ADMIN = 32
	}

	get m() {
		return async (ctx, next) => {
			// 检测传过来的Token,如果合法才next
			// 和前端约定如何传递令牌(body/header...)
			// HTTP  规定了一种身份验证机制 HttpBasicAuth
			let msg = 'Token不合法'
			let decode
			const userToken = basicAuth(ctx.req)

			// ctx.body = {token}
			// ctx.req => node.js 原生 request
			// ctx.request => koa封装后的request

			// 如果token不存在或者其中的name为空,抛出
			if (!userToken || !userToken.name) {
				throw new global.errs.Forbidden(msg)
			}

			try {
				decode = jwt.verify(userToken.name, global.config.security.secretKey)
				console.log(decode)
			} catch (error) {
				// 令牌不合法或者令牌过期
				if (error.name === 'TokenExpiredError') {
					msg = 'Token已过期'
				}
				throw new global.errs.Forbidden(msg)
			}

			if (decode.scope < this.level) {
				msg = '权限不足'
				throw new global.errs.Forbidden(msg)
			}

			// 到这里,token合法
			// 处理uid, scope
			ctx.auth = {
				uid: decode.uid,
				scope: decode.scope
			}

			await next()
		}
	}

	/**
	 * 验证令牌
	 * @param token 令牌
	 * @returns boolean 令牌是否有效
	 */
	static verifyToken(token) {
		try {
			jwt.verify(token, global.config.security.secretKey)
			return true
		} catch (e) {
			return false
		}
	}
}

module.exports = {Auth}
