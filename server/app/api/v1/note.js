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
    const id = ctx.auth.uid
    ctx.request.body.author = id
    const v = await new AddNoteValidator().validate(ctx)
    const note = v.get('body')
    await Note.addNote(note)
    success();
})

/**
 * 获取所有文章
 */
router.get('/', async ctx => {
    const notes = await Note.showAllNotes()
    ctx.body = {
        code: 201,
        data: notes,
        msg: "ok"
    }
})

/**
 * 按点赞量降序获取文章
 */
router.get('/like', async ctx => {
    const notes = await Note.showLikedNotes()
    ctx.body = {
        code: 201,
        data: notes,
        msg: "ok"
    }
})

/**
 * 按收藏量降序获取所有文章
 */
router.get('/collect', async ctx => {
    const notes = await Note.showCollectedNotes()
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

/**
 * 获取当前用户的文章
 */
router.get('/mine', new Auth().m, async ctx => {
    const notes = await Note.queryNoteById(ctx.auth.uid)
    ctx.body = {
        code: 201,
        data: notes,
        msg: "ok"
    }
})

module.exports = router