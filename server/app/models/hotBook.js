const {db} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')
const {Favor} = require('./favor')

class HotBook extends Model {
	static async getAll() {
		const books = await HotBook.findAll({
			order: ['index']    // 按照index的顺序排序
		})

		const ids = []
		books.forEach((book) => {
			ids.push(book.id)
		})

		const favors = await Favor.findAll({
			where: {
				artId: {[Op.in]: ids},
				type: 400
			},
			group: ['artId'],
			attributes: ['artId', [Sequelize.fn('COUNT', '*'), 'count']]
		})

		books.forEach(book => {
			HotBook._getEachBookStatus(book, favors)
		})

		return books
	}

	static _getEachBookStatus(book, favors) {
		let count = 0
		favors.forEach(favor => {
			if (book.id === favor.artId){
				count += 1
			}
		})
		book.setDataValue('likeCount', count)
		return book
	}
}

HotBook.init({
	index: Sequelize.INTEGER,      // 索引,用来排序
	title: Sequelize.STRING,       // 书名
	image: Sequelize.STRING,       // 书籍封面
	author: Sequelize.STRING,      // 书籍作者
}, {
	sequelize: db,
	tableName: 'hot_book'
})

module.exports = {HotBook}
