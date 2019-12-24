const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const bcryptjs = require('bcryptjs')

/**
 * User 模板,数据库生成user表
 */
class User extends Model {

	/**
	 * 验证邮箱口令
	 * @param email 邮箱
	 * @param plainPassword 密码明文 
	 */
	static async verifyEmailPassword(email, plainPassword) {
		const user = await User.findOne({
			where: { email: email }
		})

		// 没有对应用户
		if (!user) {
			throw new global.errs.AuthFailed('账号不存在!')
		}

		const correct = bcryptjs.compareSync(plainPassword, user.password)
		if (!correct) {
			throw new global.errs.AuthFailed('密码不正确!')
		}

		return user
	}

	/**
	 * 用户设置邮箱密码
	 * @param id 用户id
	 */
	static async setEmailPwd(id, info) {
		await User.update({
			...info
		},
		{
			where: {
				id: id
			}
		})
	}


	/**
	 * github一键登录
	 * @param githubId github的用户id
	 * @param userName github的用户名
	 * @param email github绑定的用户邮箱
	 */
	static async getUserByGithubId(gitUser) {
		const user = await User.findOne({
			where: {
				githubId: gitUser.id,
			}
		})
		if (user) {
			return user
		} else {
			return await User.create({
				githubId: gitUser.id,
				userName: gitUser.login,
				email: gitUser.email,
				avatar: gitUser.avatar_url,
				desc: gitUser.bio
			})
		}
	}

	/**
	 * 获取用户信息
	 * @param id 用户id
	 */
	static async getUserInfo(id) {
		return await User.findByPk(id)
	}

	/**
	 * 修改用户信息
	 * @param info 更新信息
	 * @param id 用户id
	 */
	static async modifyInfo(info, id) {
		return await User.update({
			...info
		}, {
			where: {
				id: id
			}
		})
	}

	/**
	 * 获得用户被点赞总数接口
	 * @param id 用户id 
	 */
	static async likeTotal(id) {
		// 防止循环引用
		const { Note } = require('../models/note')
		const total = await Note.sum('like_num', {
			where: {
				author: id
			}
		})
		return total
	}

	/**
	 * 获得用户被收藏总数接口
	 * @param id 用户id 
	 */
	static async collectTotal(id) {
		// 防止循环引用
		const { Note } = require('../models/note')
		const total = await Note.sum('collect_num', {
			where: {
				author: id
			}
		})
		return total
	}

	/**
	 * 获得用户文章总数接口
	 * @param id 用户id 
	 */
	static async noteTotal(id) {
		// 防止循环引用
		const { Note } = require('../models/note')
		const total = await Note.count({
			where: {
				author: id
			}
		})
		return total
	}

}

User.init({
	// 记录ID
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 用户名
	userName: Sequelize.STRING(64),
	// 邮箱
	email: {
		type: Sequelize.STRING, // 最大长度
		unique: true,               // 唯一
	},
	// 密码
	password: {
		// 观察者模式
		type: Sequelize.STRING(128),
		set(val) {
			const salt = bcryptjs.genSaltSync(10) // 10 表示生成盐的成本,越高越安全
			const hashPassword = bcryptjs.hashSync(val, salt)
			this.setDataValue('passwordset', hashPassword) // this 代表User类
		}
	},
	// GitHubId
	githubId: {
		type: Sequelize.INTEGER,
		unique: true, // 唯一
	},
	// 真实姓名
	realName: Sequelize.STRING(64),
	// 性别
	sex: Sequelize.INTEGER,
	// 邮箱
	email: Sequelize.STRING(255),
	// 专长
	expertise: Sequelize.STRING(255),
	// 简介
	desc: Sequelize.STRING(255),
	// 用户头像
	avatar: Sequelize.STRING(255)
}, {
	sequelize: db,
	tableName: 'user'
})

module.exports = { User }
