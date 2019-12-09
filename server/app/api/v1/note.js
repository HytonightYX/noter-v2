const Router = require('koa-router')
const router = new Router({prefix: '/v1/note'})
const {AddNoteValidator, NoteValidator, PublishNoteValidator} = require('../../validators/validator')
const {Note} = require('../../models/note')
const {success} = require('../../lib/helper')
const {Auth} = require('../../../middlewares/auth')

/**
 * 新增文章(保存文章草稿和发布同一接口)
 */
router.post('/add', async ctx => {
    const v = await new AddNoteValidator().validate(ctx, {id: 'writerId'})
    await Note.addNote(v.get('body.title'), v.get('body.raw'), v.get('body.html'), v.get('body.writerId'), v.get('body.tag'), v.get('body.status'))
    success();
})

router.post('/publish', async ctx => {
    const v = await new PublishNoteValidator().validate(ctx, {id: 'id'})
    await Note.update({
        status: 2,
        where: {
            id: v.get('body.id')
        }
    })
})

/**
 * 按照标题查询文章(模糊查询)
 */
router.get('/getNotesByTitle/:title',new Auth().m, async ctx => {
    const v = await new NoteValidator().validate(ctx)
    const notes = await Note.queryNoteByTitle(v.get('path.title'))
    const msg = notes.length ? "success" : "failed"
    ctx.body = {
        code: 201,
        data: notes,
        msg: msg
    }
})

module.exports = router