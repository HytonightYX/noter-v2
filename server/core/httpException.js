/**
 * Http异常
 */
class HttpException extends Error {
	constructor(message = '发生异常', errorCode = 10000, code = 400) {
		super()
		this.errorCode = errorCode
		this.code = code
		this.message = message
	}
}

/**
 * 参数异常
 */
class ParameterException extends HttpException {
	constructor(message, errorCode) {
		super()
		this.code = 400
		this.message = message || '参数错误'
		this.errorCode = errorCode || 10000
	}
}

/**
 * 成功响应
 */
class Success extends HttpException {
	constructor(message = null, data) {
		super()
		this.code = 200
		this.message = message || null
		this.data = data || null
	}
}

/**
 * 无法访问异常
 */
class NotFound extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '资源未找到'
		this.errorCode = errorCode || 10000
		this.code = 404
	}
}

/**
 * 认证授权异常
 */
class AuthFailed extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '授权失败'
		this.errorCode = errorCode || 10004
		this.code = 401
	}
}

/**
 * 禁止访问
 */
class Forbidden extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '禁止访问'
		this.errorCode = errorCode || 10006
		this.code = 403
	}
}

/**
 * 点赞异常
 */
class LikeError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '你已经点赞过了'
		this.errorCode = errorCode || 60001
		this.code = 400
	}
}

/**
 * 取消点赞异常
 */
class DislikeError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '你还没点赞呢'
		this.errorCode = errorCode || 60002
		this.code = 400
	}
}

/**
 * 收藏异常
 */
class CollectError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '你已经收藏过了'
		this.errorCode = errorCode || 60003
		this.code = 400
	}
}

/**
 * 取消收藏异常
 */
class CancelCollectError extends HttpException {
	constructor(message, errorCode) {
		super()
		this.message = message || '你还没有收藏呢'
		this.errorCode = errorCode || 60004
		this.code = 400
	}
}

/**
 * 标签异常
 */
class TagError extends HttpException {
	constructor(message, errorcode) {
		super()
		this.message = message || '一个用户最多允许自定义10个标签'
		this.errorCode = errorcode || 70001
		this.code = 400
	}
}

/**
 * note异常
 */
class NoteError extends HttpException {
	constructor(message, errorcode) {
		super()
		this.message = message || '笔记文章服务异常'
		this.errorCode = errorcode || 80001
		this.code = 400
	}
}

module.exports = {
	HttpException,
	ParameterException,
	Success,
	NotFound,
	AuthFailed,
	Forbidden,
	LikeError,
	DislikeError,
	TagError,
	CollectError,
	CancelCollectError,
	NoteError
}

