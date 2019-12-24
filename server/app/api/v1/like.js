const Router = require('koa-router')
const router = new Router({ prefix: '/v1/favor' })
const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../models/favor')
const { success } = require('../../lib/helper')

/**
 * note点赞接口
 */
router.get('/like/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, { id: 'noteId' })
	await Favor.like(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success('点赞成功', {ok: 1})
})

/**
 * note取消点赞接口
 */
router.get('/dislike/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, { id: 'noteId' })
	await Favor.dislike(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success('取消点赞成功', {ok: 1})
})

/**
 * note收藏接口
 */
router.get('/collect/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, { id: 'noteId' })
	await Favor.collect(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success('收藏成功', {ok: 1})
})

/**
 * note取消收藏接口
 */
router.get('/disCollect/:noteId', new Auth(8).m, async ctx => {
	const v = await new LikeValidator().validate(ctx, { id: 'noteId' })
	await Favor.cancelCollect(
		ctx.auth.uid,
		v.get('path.noteId')
	)
	success('取消收藏成功', {ok: 1})
})

module.exports = router
