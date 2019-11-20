const Router = require('koa-router')
const router = new Router({prefix: '/v1/like'})
const {Auth} = require('../../../middlewares/auth')
const {LikeValidator} = require('../../validators/validator')
const {Favor} = require('../../models/favor')
const {success} = require('../../lib/helper')
/**
 * 点赞接口
 */
router.post('/', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'artId'})
	// uid 号码放在auth中传递,禁止让客户端自行传递(篡改)
	await Favor.like(
		v.get('body.artId'),
		v.get('body.type'),
		ctx.auth.uid
	)

	success()
})

/**
 * 取消点赞接口
 */
router.post('/cancel', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'artId'})
	// uid 号码放在auth中传递,禁止让客户端自行传递(篡改)
	await Favor.dislike(
		v.get('body.artId'),
		v.get('body.type'),
		ctx.auth.uid
	)

	success()
})


module.exports = router
