function success(message, data) {
	throw new global.errs.Success(message, data)
}

module.exports = {
	success
}

