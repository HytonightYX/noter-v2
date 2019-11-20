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

	static async getUserByOpenId(openid) {
		return await User.findOne({where:{openid: openid}})
	}

	static async registerByOpenId(openid) {
		return await User.create({openid: openid})
	}
}

User.init({
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	nickname: Sequelize.STRING(32),
	email: {
		type: Sequelize.STRING, // 最大长度
		unique: true,               // 唯一
	},
	password: {
		// 观察者模式
		type: Sequelize.STRING,
		set(val) {
			const salt = bcryptjs.genSaltSync(10) // 10 表示生成盐的成本,越高越安全
			const hashPassword = bcryptjs.hashSync(val, salt)
			this.setDataValue('password', hashPassword) // this 代表User类
		}
	},
	openid: {
		type: Sequelize.STRING(64), // 最大长度
		unique: true,               // 唯一
	}
}, {
	sequelize: db,
	tableName: 'user'
})

module.exports = {User}
