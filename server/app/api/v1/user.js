const Router = require('koa-router')
const router = new Router({ prefix: '/v1/user' })
const { User } = require('../../models/user')
const { RegisterValidator, UserModifyValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')

/**
 * 注册功能
 */
router.post('/register', async (ctx, next) => {
	const v = await new RegisterValidator().validate(ctx)

	const user = {
		email: v.get('body.email'),
		password: v.get('body.password1'),
		userName: v.get('body.username')
	}
	const r = await User.create(user)
	success()
})

/**
 * 获取用户信息
 */
router.get('/info', new Auth().m, async ctx => {
	const user = await User.getUserInfo(ctx.auth.uid)
	success('ok', user)
})

/**
 * 用户信息编辑
 */
router.post('/modify', new Auth().m, async ctx => {
	const v = await new UserModifyValidator().validate(ctx)
	await User.modifyInfo(v.get('body'), ctx.auth.uid)
	success()
})


module.exports = router
