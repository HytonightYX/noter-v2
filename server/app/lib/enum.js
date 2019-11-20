/**
 * JS类来模拟枚举
 */

/**
 * 登录方式枚举类
 * @type {{USER_MINI_PROGRAM: number, USER_EMAIL: number, USER_MOBILE: number, ADMIN_EMAIL: number}}
 */
const LoginType = {
	USER_MINI_PROGRAM: 100, // 小程序登录
	USER_EMAIL: 101,        // 邮箱登录
	USER_MOBILE: 102,       // 手机号登录
	ADMIN_EMAIL: 200,       // 管理员邮箱登录
	isThisType
}

/**
 * Art类型枚举类
 * @type {{MUSIC: number, MOVIE: number, BOOK: number, SENTENCE: number}}
 */
const ArtType = {
	MOVIE: 100,
	MUSIC: 200,
	SENTENCE: 300,
	BOOK: 400,
	isThisType
}

/**
 * 判断val是否属于该类型
 * @param val
 * @returns {boolean}
 */
function isThisType(val) {
	for (let key in this) {
		if (this[key] === val) {
			return true
		}
	}
	return false
}

module.exports = {
	LoginType,
	ArtType,
}
