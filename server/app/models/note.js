const { Sequelize, Model, Op } = require('sequelize')
const { db } = require('../../core/db')
const { Tag } = require('../models/tag')

class Note extends Model {
	/**
	 * 用于JSON序列化
	 */
	toJSON() {
		let origin = {
			id: this.id,
			title: this.title,
			raw: this.raw,
			html: this.html,
			author: this.writerId,
			tag: this.tag,
			likeNum: this.likeNum,
			collectNum: this.collectNum
		};
		return origin;
	}

	/**
	 * 新增文章,存草稿或者直接发布
	 */
	static async addNote(note) {
		console.log(note)
		return await Note.create({
			...note
		})
	}

	/**
	 * 按更新时间降序排序
	 */
	static async showAllNotes() {
		let notes = await db.query(
			`
			SELECT u.user_name, u.avatar, n.*
			FROM note n 
			LEFT JOIN user u ON n.author = u.id
			order by n.updated_at DESC
			`
			, { raw: true })
		let tagObj = {}

		await Tag.findAll({ raw: true }).map(item => {
			tagObj[item.id] = item.name
		})


		notes = notes[0].map(item => {

			let tags = item.tag.split(',').map(item => {
				return { id: item, name: tagObj[item] }
			})
			item.tags = tags
			return item
		})

		return notes
	}

	/**
	 * 按点赞数目降序排序
	 */
	static async showLikedNotes() {
		return await Note.findAll({
			order: [
				['likeNum', 'DESC']
			]
		})
	}

	/**
	 * 按收藏数目降序排序
	 */
	static async showCollectedNotes() {
		return await Note.findAll({
			order: [
				['collectNum', 'DESC']
			]
		})
	}

	/**
	 * 按标题搜索文章（模糊查询），按更新时间降序排序
	 * @param title 
	 */
	static async queryNoteByTitle(title) {
		return await Note.findAll({
			where: {
				title: {
					[Op.like]: `%${title}%`
				},
				order: [
					['updatedAt', 'DESC']
				]
			}
		})
	}

	/**
	 * 查询用户所有文章，降序排序
	 * @param id 用户ID 
	 */
	static async queryNoteByAuthor(id) {
		return await Note.findAll({
			where: {
				author: id
			},
			order: [
				['updatedAt', 'DESC']
			]
		})
	}

	/**
	 * 查询文章详情
	 * @param id 
	 */
	static async queryNoteById(id) {
		const content = await Note.findByPk(id, {
			attributes: { exclude: ['raw'] }
		})
		return content
	}

	/**
	 * 文章的删除操作，同时通过事务删除点赞收藏表中的数据
	 * @param id 用户ID
	 */
	static async deleteNote(id) {
		const note = await Note.findByPk(id)
		if (!note) {
			throw new global.errs.NotFound('Note is not found!')
		}
		// 局部引用、防止循环引用
		const { Favor } = require('../models/favor')
		db.transaction(async t => {
			await note.destroy({
				force: true,
				transaction: t
			})
			return await Favor.destroy({
				where: {
					artId: id
				},
				force: true,
				transaction: t
			})
		})
	}

	/**
	 * 更新文章
	 * @param note 文章实体 
	 */
	static async updateNote(note) {
		const oldNote = Note.findByPk(note.id)
		if (!oldNote) {
			throw new global.errs.NotFound()
		}
		Note.update({
			...note
		}, {
			where: {
				id: note.id
			}
		})
	}
}

Note.init({
	// 记录ID
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	// 标题
	title: Sequelize.STRING(255),
	// json内容
	raw: Sequelize.TEXT,
	// html内容
	html: Sequelize.TEXT,
	// 作者Id
	author: Sequelize.INTEGER,
	// 文章类型
	tag: Sequelize.STRING(100),
	// 点赞数量
	likeNum: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	// 收藏数量
	collectNum: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	// 所处状态
	status: {
		type: Sequelize.INTEGER,
		defaultValue: 1 //处于草稿状态
	}
}, {
	sequelize: db,
	tableName: 'note'
})

module.exports = { Note }