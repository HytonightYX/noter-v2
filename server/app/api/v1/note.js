const Router = require('koa-router')
const router = new Router({prefix: '/v1/note'})
const {AddNoteValidator, NoteValidator, PublishNoteValidator, PositiveIntegerValidator} = require('../../validators/validator')
const {Note} = require('../../models/note')
const {Tag} = require('../../models/tag')
const {success} = require('../../lib/helper')
const {Auth} = require('../../../middlewares/auth')
const dayjs = require('dayjs')
const multer = require('@koa/multer')
// 文件上传中间件
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        let type = file.originalname.split('.').splice(-1)
    cb(null, `IMG_${dayjs((new Date())).format('YYYYMMDDhhmmss')}.${type}`)
    }
})
// 初始化中间件
const upload = multer({storage})

/**
 * 新增文章
 */
router.post('/add',new Auth().m, async ctx => {
    const id = ctx.auth.uid
    ctx.request.body.author = id
    const v = await new AddNoteValidator().validate(ctx)
    const note = v.get('body')
    await Note.addNote(note)
    success('ok');
})

/**
 * 获取所有文章
 */
router.get('/', async ctx => {
    const notes = await Note.showAllNotes()
    success('ok', notes)
})

/**
 * 按点赞量降序获取文章
 */
router.get('/like', async ctx => {
    const notes = await Note.showLikedNotes()
    success('ok', notes)
})

/**
 * 按收藏量降序获取所有文章
 */
router.get('/collect', async ctx => {
    const notes = await Note.showCollectedNotes()
    success('ok', notes)
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
    success('ok', notes)
})

/**
 * 文章图片上传接口
 */
router.post('/upload', new Auth().m, upload.single('file'), ctx => {
    const path = ctx.file.path.replace('\\', '/')
        success('ok', {path})
    }
  )

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

/**
 * 删除用户文章接口,同时删除该文章的所有点赞收藏记录
 */
router.get('/delete/:id', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {id: 'id'})
    await Note.deleteNote(v.get('path.id'))
    success()
})

router.post('/update', new Auth().m, async ctx => {
    const id = ctx.auth.uid
    ctx.request.body.author = id
    const v = await new AddNoteValidator().validate(ctx)
    const newNote = v.get('body')
    await Note.updateNote(newNote)
    success('ok');
})

module.exports = router