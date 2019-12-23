const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

/**
 * 微信登陆服务
 */
class MXManager {

	/**
	 * 生成token
	 * @param code 
	 */
	static async codeToToken(code) {
		// 格式化字符串
		const url = util.format(
			global.config.wx.loginUrl,
			global.config.wx.appId,
			global.config.wx.appSecret,
			code
		)

		const res = await axios.get(url)
		if (res.status !== 200) {
			throw new global.errs.AuthFailed('openid获取失败')
		}

		const errcode = res.data.errcode

		if (errcode) {
			throw new global.errs.AuthFailed(
				'openid获取失败,错误码:' + errcode +
				'\n详情参阅https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html'
			)
		}

		/**
		 * 新用户,第一次拿到openid,写入数据库.
		 * 再次登录时,先去数据库查一下是否已经有openid
		 * 有的话无需再次写入
		 */
		let user = await User.getUserByOpenId(res.data.openid)
		if (!user) {
			user = await User.registerByOpenId(res.data.openid)
		}

		return generateToken(user.id, Auth.USER)
	}
}


module.exports = { MXManager }
