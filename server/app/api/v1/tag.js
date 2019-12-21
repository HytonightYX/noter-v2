const Router = require('koa-router')
const router = new Router({prefix: '/v1/tag'})
const {Tag} = require('../../models/tag')
const {success} = require('../../lib/helper')
const {Auth} = require('../../../middlewares/auth')
const {TagAddValidator} = require('../../validators/validator')

router.get('/', async ctx => {
    const tags = await Tag.showTags()
    ctx.body = {
        code: 200,
        data: tags,
        msg: 'ok'
    }
})

router.get('/add/:name', new Auth().m ,async ctx => {
    const v = await new TagAddValidator().validate(ctx)
    const name = v.get('path.name')
    await Tag.addTags(name, ctx.auth.uid)
    success()
})

module.exports = router