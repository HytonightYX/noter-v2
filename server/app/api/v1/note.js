const Router = require('koa-router')
const router = new Router({ prefix: '/v1/note' })
const { AddNoteValidator, NoteValidator, PublishNoteValidator, PositiveIntegerValidator } = require('../../validators/validator')
const { Note } = require('../../models/note')
const { success } = require('../../lib/helper')
const { Auth } = require('../../../middlewares/auth')
const dayjs = require('dayjs')
const multer = require('@koa/multer')

// 文件上传中间件
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'upload/')
	},
	filename: function (req, file, cb) {
		let type = file.originalname.split('.').splice(-1)
		cb(null, `IMG_${dayjs((new Date())).format('YYYYMMDDhhmmss')}.${type}`)
	}
})
// 初始化中间件
const upload = multer({ storage })

/**
 * 新增文章
 */
router.post('/add', new Auth().m, async ctx => {
	const v = await new AddNoteValidator().validate(ctx)
	const note = v.get('body')
	note.author = ctx.auth.uid
	await Note.addNote(note)
	success('新增成功')
})

/**
 * 获取所有文章
 */
router.get('/', async () => {
	const notes = await Note.showAllNotes()
	success('已更新', notes)
})

/**
 * 获取所有文章
 */
router.get('/list', async () => {
	const notes = await Note.showAllNotes(false)
	success('已更新', notes)
})

/**
 * 获取最热文章
 */
router.get('/hot', async () => {
	const notes = await Note.showHotNotes()
	success('已更新', notes)
})

/**
 * 按点赞量降序获取文章
 */
router.get('/like', async () => {
	const notes = await Note.showLikedNotes()
	success('ok', notes)
})

/**
 * 按收藏量降序获取所有文章
 */
router.get('/collect', async () => {
	const notes = await Note.showCollectedNotes()
	success('ok', notes)
})

/**
 * 文章发布接口
 */
router.post('/publish', async ctx => {
	const v = await new PublishNoteValidator().validate(ctx, { id: 'id' })
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
router.get('/search/:title', async ctx => {
	const v = await new NoteValidator().validate(ctx)
	const notes = await Note.queryNoteByTitle(v.get('path.title'))
	success('ok', notes)
})

/**
 * 文章图片上传接口
 */
router.post('/upload', new Auth().m, upload.single('file'), ctx => {
	const path = ctx.file.path.replace('\\', '/')
	success('ok', { path })
}
)

/**
 * 获取当前用户的文章
 */
router.get('/mine', new Auth().m, async ctx => {
	const notes = await Note.queryNoteByAuthor(ctx.auth.uid)
	success('已更新', { notes })
})

/**
 * 删除用户文章接口,同时删除该文章的所有点赞收藏记录
 */
router.get('/delete/:id', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, { id: 'id' })
	await Note.deleteNote(v.get('path.id'))
	success('删除成功', {ok: 1})
})

/**
 * 用户请求文章编辑接口
 */
router.get('/modify/:id', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, { id: 'id' })
	const content = await Note.modifyNote(v.get('path.id'), ctx.auth.uid)
	success('开始更改', { content })
})

/**
 * 文章更新接口
 */
router.post('/update', new Auth().m, async ctx => {
	const id = ctx.auth.uid
	ctx.request.body.author = id
	const v = await new AddNoteValidator().validate(ctx)
	const newNote = v.get('body')
	await Note.updateNote(newNote)
	success('ok');
})

/**
 * 文章详情接口
 */
router.get('/:id', async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, { id: 'id' })
	const id = v.get('path.id')
	const content = await Note.queryNoteById(id)
	success('ok', content)
})

/**
 * 判断用户是否对此文章点赞接口
 */
router.get('/isFavor/:id', new Auth().m, async ctx => {
	const v = await new PositiveIntegerValidator().validate(ctx, { id: 'id' })
	const r = await Promise.all([
		Note.isLike(ctx.auth.uid, v.get('path.id')),
		Note.isCollect(ctx.auth.uid, v.get('path.id'))
	])
	success(null, {
		like: r[0],
		collect: r[1]
	})
})

/**
 * 按照标签获取文章
 */
router.get('/byTag/:id', async ctx => {
	const v = await new NoteValidator().validate(ctx)
	const tags = v.get('path.id')
	const data = await Note.queryNoteByTag(tags)
	success('更新成功', {data})
})

module.exports = router