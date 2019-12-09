const Router = require('koa-router')
const router = new Router({prefix: '/v1/user'})
const {User} = require('../../models/user')
const {RegisterValidator} = require('../../validators/validator')
const {success} = require('../../lib/helper')

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

module.exports = router
