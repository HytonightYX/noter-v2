const {LinValidator, Rule} = require('../../core/lin-validator-v2')
const {User} = require('../models/user')
const {LoginType, ArtType} = require('../lib/enum')

class PositiveIntegerValidator extends LinValidator {
	constructor() {
		super()
		this.id = [
			new Rule('isInt', '需要正整数', {min: 1})
		]
	}
}

class RegisterValidator extends LinValidator {
	constructor() {
		super()
		this.email = [
			new Rule('isEmail', '不符合Email规范')
		]
		this.password1 = [
			new Rule('isLength', '密码长度为6~32字符', {min: 6, max: 32}),
			new Rule('matches', '密码至少1个大写字母，1个小写字母和1个数字', /^[\w_-]{6,16}$/)
		]
		this.password2 = this.password1
		this.nickname = [
			new Rule('isLength', '昵称长度为4~32字符', {min: 4, max: 32})
		]
	}

	validatePassword(vals) {
		const pwd1 = vals.body.password1
		const pwd2 = vals.body.password2

		if (pwd1 !== pwd2) {
			throw new Error('两个密码必须相同')
		}
	}

	// 验证邮箱是被已被注册
	async validateEmail(vals) {
		const email = vals.body.email
		const user = await User.findOne({
			where: {
				email: email
			}
		})

		// 如果已存在该Email
		if (user) {
			throw new Error('该Email已被注册!')
		}
	}
}

class TokenValidator extends LinValidator {
	constructor() {
		super()
		this.account = [
			new Rule('isLength', '不符合账号规则', {min: 4, max: 32})
		]
		this.secret = [
			new Rule('isOptional'),
			new Rule('isLength', '密码至少6个字符!', {min: 6, max: 128})
		]
	}

	validateLoginType(vals) {
		if (!vals.body.type) {
			throw new Error('缺少type参数')
		}

		if (!LoginType.isThisType(vals.body.type)) {
			throw new Error('type参数不合法')
		}
	}
}

/**
 * 不能为空校验器
 */
class NotEmptyValidator extends LinValidator {
	constructor() {
		super()
		this.token = [
			new Rule('isLength', '不允许为空', {
				min: 1
			})
		]
	}
}

/**
 * 点赞校验器
 * 点赞数必须为非负数
 */
class LikeValidator extends PositiveIntegerValidator {
	constructor() {
		super()
		this.validateType = checkArtType
	}
}

/**
 * Classic校验器
 * 校验 type 和 id, 和 LikeValidator 一样,直接继承
 */
class ClassicValidator extends LikeValidator {
	constructor() {
		super()
		this.validateType = checkArtType
	}
}

/**
 *
 */
class AddShortCommentValidator extends PositiveIntegerValidator {
	constructor() {
		super()
		this.content = [
			new Rule('isLength', '短评长度为1-24字符', {min: 1, max: 24})
		]
	}
}

/**
 * 书籍搜索参数校验
 */
class SearchValidator extends LinValidator {
	constructor() {
		super()
		// keyword 要查询的关键字
		this.q = [
			new Rule('isLength', '搜索关键字q不能为空', {min: 1, max: 16}),
		]
		// 分页:
			// 老版分页需要pageNum/perPage两个参数
			// 现在一般用start/count两个参数
		this.start = [
			new Rule('isInt', '参数不合法', {min: 0, max: 60000}),
			new Rule('isOptional', '', 0),    // 不传start的话,默认给个0
		]

		this.count = [
			new Rule('isInt', '参数不合法', {min: 1, max: 20}),
			new Rule('isOptional', '', 20),    // 不传count的话,默认给个20
		]
	}
}

/**
 * loginType 检查
 * @param vals
 */
function checkLoginType(vals) {
	const type = parseInt(vals.body.type || vals.path.type)
	if (!type) {
		throw new Error('缺少loginType参数')
	}

	if (!LoginType.isThisType(type)) {
		throw new Error('loginType参数不合法')
	}
}

/**
 * artType 检查
 * @param vals
 */
function checkArtType(vals) {
	const type = parseInt(vals.body.type || vals.path.type)
	if (!type) {
		throw new Error('缺少artType参数')
	}

	if (!ArtType.isThisType(type)) {
		throw new Error('artType参数不合法')
	}
}

module.exports = {
	PositiveIntegerValidator,
	RegisterValidator,
	TokenValidator,
	NotEmptyValidator,
	LikeValidator,
	ClassicValidator,
	SearchValidator,
	AddShortCommentValidator,
}
