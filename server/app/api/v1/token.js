const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const router = new Router({ prefix: '/v1/token' })
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { MXManager } = require('../../services/wx')
const { github } = require('../../../config/config')
const { success } = require('../../lib/helper')
const { getToken } = require('../../services/qiniu')
const axios = require('axios')

/**
 * 校验令牌
 */
router.post('/', async (ctx) => {
	// API 有权限,非公开API必须携带令牌才能访问
	// 如果令牌过期或者不合法,则禁止访问该非公开API
	const v = await new TokenValidator().validate(ctx)
	let token

	switch (v.get('body.type')) {
		case LoginType.USER_EMAIL:
			token = await emailLogin(v.get('body.account'), v.get('body.secret'))
			break
		case LoginType.USER_MINI_PROGRAM:
			token = await MXManager.codeToToken(v.get('body.account'))
			break
		default:
			throw new global.errs.ParameterException('没有响应的异常处理函数')
	}

	ctx.body = {
		code: 200,
		data: { token },
		message: null
	}
})

/**
 * 验证令牌接口
 */
router.post('/verify', async (ctx) => {
	const v = await new NotEmptyValidator().validate(ctx)
	const res = Auth.verifyToken(v.get('body.token'))
	ctx.body = { result: res }
})

/**
 * github一键登录接口
 */
router.get('/github', async ctx => {
	const code = ctx.query.code
	const r = await axios.post('https://github.com/login/oauth/access_token', {
		client_id: github.client_id,
		client_secret: github.client_secret,
		code: code
	})
	if (r && r.status === 200) {
		if (r.data.split('=')[0] === 'access_token') {
			const tr = await axios.get('https://api.github.com/user?' + r.data)
			if (tr && tr.status === 200) {
				const { token, user } = await githubLogin(tr.data)
				success(user.userName + '欢迎您', { token, user, type: 233 })
			}
		} else {
			throw new global.errs.Forbidden()
		}
	}
})

/**
 * 验证令牌接口
 */
router.post('/qiniu', async (ctx) => {
	const token = getToken()
	success(null, { token })
})

/**
 * 校验用户账号密码是否和数据库中一致,
 * 如果一致,则颁布一个令牌
 *
 * @param account
 * @param secret
 * @returns {Promise<void>}
 */
async function emailLogin(account, secret) {
	const user = await User.verifyEmailPassword(account, secret)
	return generateToken(user.id, Auth.USER)
}

/**
 * 用户github登录方法
 * @param githubId
 */
async function githubLogin(gitUser) {
	const user = await User.getUserByGithubId(gitUser)
	const token = generateToken(user.id, Auth.USER)
	return {
		token,
		user
	}
}

module.exports = router
