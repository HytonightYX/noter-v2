/**
 * success响应构造器
 * @param message 响应消息
 * @param data 响应数据
 */
function success(message, data) {
	throw new global.errs.Success(message, data)
}

module.exports = {
	success
}

