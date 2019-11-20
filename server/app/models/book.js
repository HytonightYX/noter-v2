const {Sequelize, Model} = require('sequelize')
const {db} = require('../../core/db')
const axios = require('axios')
const util = require('util')
const {Favor} = require('./favor')

class Book extends Model {
	/**
	 * 从YuShu的API获取图书详情
	 */
	static async getDetail(id) {
		const url = util.format(global.config.yushu.detailUrl, id)
		const detail = await axios.get(url)
		return detail.data
	}

	/**
	 * 从YuShu的API用关键词搜索图书列表
	 */
	static async searchFromYuShu(q, start, count, summary=true) {
		const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), start, count, summary? 1 : 0)
		const res = await axios.get(url)
		return res.data
	}

	/**
	 * 获取喜欢书籍的数量
	 * @param uid 用户id
	 */
	static async getMyFavorBookCount(uid) {
		// 内置计数方法, 仅仅返回一个Number
		return await Favor.count({
			where: {
				type: 400,
				uid: uid,
			}
		})
	}

}

Book.init({
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	favNums: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
}, {
	sequelize: db,
	tableName: 'book'
})

module.exports = {
	Book
}
