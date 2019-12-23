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

/**
 * 获取用户信息
 */
router.get('/info', new Auth().m, async ctx => {
	const user = await User.getUserInfo(ctx.auth.uid)
	success('更新成功', user)
})

/**
 * 用户信息编辑
 */
router.post('/modify', new Auth().m, async ctx => {
	const v = await new UserModifyValidator().validate(ctx)
	await User.modifyInfo(v.get('body'), ctx.auth.uid)
	success('信息更新成功')
})

/**
 * 用户所获得的所有点赞总数接口
 */
router.get('/like', new Auth().m, async ctx => {
	const total = await User.likeTotal(ctx.auth.uid)
	success(null, {total})
})

/**
 * 用户所获得的所有收藏总数接口
 */
router.get('/collect', new Auth().m, async ctx => {
	const total = await User.collectTotal(ctx.auth.uid)
	success(null, {total})
})


module.exports = router
