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
	await User.create(user)
	success()
})

router.post('/bind', new Auth().m, async (ctx) => {
	const v = await new UserModifyValidator().validate(ctx)
	await User.setEmailPwd(ctx.auth.uid, v.get('body'))
	success('绑定成功', {ok: 1})
})

/**
 * 获取用户信息
 */
router.get('/info', new Auth().m, async ctx => {
	const user = await User.getUserInfo(ctx.auth.uid)
	success('登陆成功', user)
})

/**
 * 用户信息编辑
 */
router.post('/modify', new Auth().m, async ctx => {
	const v = await new UserModifyValidator().validate(ctx)
	await User.modifyInfo(v.get('body'), ctx.auth.uid)
	success('信息更新成功', {ok: 1})
})

/**
 * 用户所获得的所有点赞、收藏、文章总数接口
 */
router.get('/status', new Auth().m, async ctx => {
	const r = await Promise.all([
		User.likeTotal(ctx.auth.uid),
		User.collectTotal(ctx.auth.uid),
		User.noteTotal(ctx.auth.uid)
	])
	success(null, {
		likeNum: r[0],
		collectNum: r[1],
		noteNum: r[2]
	})
})


module.exports = router
