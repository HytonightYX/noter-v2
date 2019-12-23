const { Sequelize, Model } = require('sequelize')
const { db } = require('../../core/db')

class Tag extends Model {
	/**
	 * 展示所有用户标签
	 */
	static async showTags() {
		return await Tag.findAll({
			where: {
				author: 0
			}
		})
	}

	/**
	 * 添加标签方法
	 * @param name 标签名
	 * @param author 作者id
	 */
	static async addTags(name, author) {
		return await Tag.create({
			name: name,
			author: author
		})
	}
}

Tag.init({
	// 记录Id
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// TAG名称
	name: Sequelize.STRING(100),
	author: Sequelize.INTEGER
}, {
	sequelize: db,
	tablename: 'tag'
})

module.exports = { Tag }