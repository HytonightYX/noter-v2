const Router = require('koa-router')
const router = new Router({ prefix: '/v1/tag' })
const { Tag } = require('../../models/tag')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')
const { TagAddValidator } = require('../../validators/validator')

/**
 * 获取所有标签接口
 */
router.get('/', async () => {
	const tags = await Tag.showTags()
	success(null, tags)
})

/**
 * 自定义标签接口
 */
router.post('/add', new Auth().m, async ctx => {
	const v = await new TagAddValidator().validate(ctx)
	const name = v.get('body.name')
	await Tag.addTags(name, 0)
	success()
})

/**
 * 返回所有系统定义tags
 */
router.get('/getAllTags', new Auth().m, async ctx => {
	const tags = await Tag.showTags()
	success(null, tags)
})

module.exports = router