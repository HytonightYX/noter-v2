function success(message, errorCode) {
	throw new global.errs.Success(message, errorCode)
}

module.exports = {
	success
}

