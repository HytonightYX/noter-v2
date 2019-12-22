const Router = require('koa-router')
const router = new Router({prefix: '/v1/favor'})
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

/**
 * note点赞接口
 */
router.get('/like/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'noteId'})
	await Favor.like(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success()
})

/**
 * note取消点赞接口
 */
router.get('/dislike/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'noteId'})
	await Favor.dislike(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success()
})

/**
 * note收藏接口
 */
router.get('/collect/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'noteId'})
	await Favor.collect(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success()
})

/**
 * note取消收藏接口
 */
router.get('/cancelCollect/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, {id: 'noteId'})
	await Favor.cancelCollect(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success()
})

module.exports = router
