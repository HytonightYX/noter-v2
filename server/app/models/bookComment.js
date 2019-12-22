const { db } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class Comment extends Model {
	/**
	 * 增加评论
	 * @param bookId
	 * @param content
	 * @returns {Promise<Comment|this>}
	 */
	static async addComment(bookId, content) {
		const comment = await Comment.findOne({
			where: {
				bookId: bookId,
				content: content
			}
		})

		if (!comment) {
			return await Comment.create({
				bookId: bookId,
				content: content,
				nums: 1
			})
		} else {
			return await comment.increment('nums', { by: 1 })
		}
	}

	static async getComments(bookId) {
		return await Comment.findAll({
			where: { bookId: bookId }
		})
	}
}

Comment.init({
	bookId: Sequelize.INTEGER,
	content: Sequelize.STRING(12),   // 短评限制12字符
	nums: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
}, {
	sequelize: db,
	tableName: 'comment'
})

module.exports = {
	Comment
}
