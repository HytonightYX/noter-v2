const Router = require('koa-router')
const router = new Router({ prefix: '/v1/upload' })
const path = require('path')
const send = require('koa-send')

/**
 * 获取静态资源接口
 */
router.get('/:filename', async (ctx) => {
	const filename = ctx.params.filename
	console.log(filename)
	await send(ctx, filename, { root: path.resolve(__dirname, '../../../upload') })
})

module.exports = router