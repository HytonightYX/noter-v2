const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
	static async verifyEmailPassword(email, plainPassword) {
		const user = await User.findOne({
			where: {email: email}
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

	static async getUserByGithubId(githubId) {
		return await User.findOne({where:{github_id: githubId}})
	}

	static async registerByGithubId(githubId) {
		return await User.create({github_id: githubId})
	}

	static async getUserInfo(id) {
		return await User.findOne({where: {id: id}})
	}

	static async modifyInfo(info, id) {
		return await User.update({
			...info
		}, {
			where: {
				id: id
			}
		})
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
			this.setDataValue('password', hashPassword) // this 代表User类
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
	desc: Sequelize.STRING(255)
}, {
	sequelize: db,
	tableName: 'user'
})

module.exports = {User}
