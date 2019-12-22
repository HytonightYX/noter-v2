const Router = require('koa-router')
const router = new Router({prefix: '/v1/tag'})
const {Tag} = require('../../models/tag')
const {success} = require('../../lib/helper')
const {Auth} = require('../../../middlewares/auth')
const {TagAddValidator} = require('../../validators/validator')

/**
 * 获取所有标签接口
 */
router.get('/', async ctx => {
    const tags = await Tag.showTags()
    success('ok', tags)
})

/**
 * 自定义标签接口
 */
router.get('/add/:name', new Auth().m ,async ctx => {
    const v = await new TagAddValidator().validate(ctx)
    const name = v.get('path.name')
    await Tag.addTags(name, ctx.auth.uid)
    success()
})

/**
 * 返回所有系统定义tags
 */
router.get('/getAllTags', new Auth().m, async ctx => {
    const tags = await Tag.showTags()
    success('ok', tags)
})

module.exports = router