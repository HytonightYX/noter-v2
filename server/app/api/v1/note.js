const Router = require('koa-router')
const router = new Router({prefix: '/v1/note'})
const {AddNoteValidator, NoteValidator, PublishNoteValidator} = require('../../validators/validator')
const {Note} = require('../../models/note')
const {Tag} = require('../../models/tag')
const {success} = require('../../lib/helper')
const {Auth} = require('../../../middlewares/auth')

/**
 * 新增文章(保存文章草稿和发布同一接口)
 */
router.post('/add',new Auth().m, async ctx => {
    const v = await new AddNoteValidator().validate(ctx, {id: 'author'})
    const note = v.get('body')
    console.log('add', note)
    await Note.addNote(note)
    success();
})

router.get('/getAllNotes', async ctx => {
    const notes = await Note.showAllNotes()
    ctx.body = {
        code: 201,
        data: notes,
        msg: "ok"
    }
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
router.get('/getNotesByTitle', async ctx => {
    const v = await new NoteValidator().validate(ctx)
    const notes = await Note.queryNoteByTitle(v.get('path.title'))
    const msg = notes.length ? "success" : "failed"
    ctx.body = {
        code: 201,
        data: notes,
        msg: msg
    }
})

/**
 * 返回所有系统定义tags
 */
router.get('/getAllTags', new Auth().m, async ctx => {
    const tags = await Tag.showTags()
    ctx.body = {
        code: 201,
        data: tags,
        msg: "ok"
    }
})

router.post('/addTag', new Auth().m, async ctx => {
    
})

module.exports = router