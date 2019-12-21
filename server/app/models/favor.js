const {db} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')
const {Art} = require('../models/art')
const {Note} = require('../models/note')


/**
 * Favor业务表
 * 记录某用户是否对某期刊点赞
 */
class Favor extends Model {

	/**
	 * 用户是否喜欢该期刊
	 * @param artId
	 * @param type
	 * @param uid
	 * @returns {Promise<boolean>}
	 */
	static async userLikeIt(artId, type, uid) {
		const favor = await Favor.findOne({
			where: {uid, artId, type}
		})
		return favor ? true : false
	}

	static async getMyClassicFavors(uid) {
		const arts = await Favor.findAll({
			where: {
				uid: uid,
				type: {
					// 排除book类型
					[Op.not]: 400
				}
			}
		})

		if (!arts) {
			throw new global.err.NotFound()
		}

		// 禁止循环查询数据库
		return await Art.getList(arts)
	}

	/**
	 * 获取用户是否喜欢某书籍
	 * @param uid
	 * @param bookId
	 * @returns {Promise<{likeStatus: number, favNums: number}>}
	 */
	static async getBookFavor(uid, bookId){
		const favorNums = await Favor.count({
			where: {
				artId: bookId,
				type: 400
			}
		})

		const myFavor = await Favor.findOne({
			where:{
				artId: bookId,
				uid: uid,
				type: 400
			}
		})

		return {
			favNums:favorNums,
			likeStatus:myFavor?1:0
		}
	}

	/**
	 * note点赞方法
	 * @param uid 用户ID
	 * @param artId 文章ID
	 */
	static async like(uid, artId) {
		const favor = await Favor.findOne({
			where: {
				uid: uid,
				artId: artId,
				type: 1
			}
		})
		// 如果点赞过了不允许点赞
		if (favor) {
			throw new global.errs.LikeError()
		}
		// 获取note实体
		const note = await Note.findOne({
			where: {
				author: uid,
				id: artId
			}
		})
		// note如果不存在直接抛出异常
		if (!note) {
			throw new global.errs.NotFound()
		}
		// 使用事务，note表点赞量加1同时点赞收藏表新增记录
		db.transaction(async t => {
			// 添加记录
			await Favor.create({
				artId: artId, 
				type: 1, 
				uid: uid
			}, {
				transaction: t
			})
			// 对note实体中的likeNum字段进行 +1 操作
			return await note.increment('likeNum', {by: 1, transaction: t})
		})
	}

	/**
	 * 取消点赞的方法
	 * @param artId 
	 * @param uid 
	 */
	static async dislike(artId, uid) {
		const favor = await Favor.findOne({
			where: {
				artId: artId, 
				type: 1, 
				uid: uid
			}
		})

		// 当前用户还没点过赞,自然不能取消点赞
		if (!favor) {
			throw new global.errs.DislikeError()
		}
		// 获取note实体
		const note = await Note.findOne({
			where: {
				author: uid,
				id: artId
			}
		})
		// note如果不存在直接抛出异常
		if (!note) {
			throw new global.errs.NotFound()
		}
		// return db.transaction
		db.transaction(async t => {
			// 删除记录
			await favor.destroy({
				// true 硬删除/false 软删除
				force: true,
				transaction: t,
			})
			// 对note实体中的likeNum字段进行 -1 操作
			return await note.decrement('likeNum', {by: 1, transaction: t})
		})
	}

	/**
	 * 收藏文章的方法
	 * @param uid 用户id
	 * @param artId 文章id
	 */
	static async collect(uid, artId) {
		const favor = await Favor.findOne({
			where: {
				uid: uid,
				artId: artId,
				type: 2
			}
		})
		// 如果收藏过了不允许收藏
		if (favor) {
			throw new global.errs.CollectError()
		}
		// 获取note实体
		const note = await Note.findOne({
			where: {
				author: uid,
				id: artId
			}
		})
		// note如果不存在直接抛出异常
		if (!note) {
			throw new global.errs.NotFound()
		}
		// 使用事务，note表点赞量加1同时点赞收藏表新增记录
		db.transaction(async t => {
			// 添加记录
			await Favor.create({
				artId: artId, 
				type: 2, 
				uid: uid
			}, {
				transaction: t
			})
			// 对note实体中的likeNum字段进行 +1 操作
			return await note.increment('collectNum', {by: 1, transaction: t})
		})
	}

	/**
	 * 取消收藏的方法
	 * @param uid 用户id
	 * @param artId 文章id
	 */
	static async cancelCollect(uid, artId) {
		const favor = await Favor.findOne({
			where: {
				artId: artId, 
				type: 2, 
				uid: uid
			}
		})

		// 当前用户还没点过赞,自然不能取消点赞
		if (!favor) {
			throw new global.errs.CancelCollectError()
		}
		// 获取note实体
		const note = await Note.findOne({
			where: {
				author: uid,
				id: artId
			}
		})
		// note如果不存在直接抛出异常
		if (!note) {
			throw new global.errs.NotFound()
		}
		// return db.transaction
		db.transaction(async t => {
			// 删除记录
			await favor.destroy({
				// true 硬删除/false 软删除
				force: true,
				transaction: t,
			})
			// 对note实体中的likeNum字段进行 -1 操作
			return await note.decrement('collectNum', {by: 1, transaction: t})
		})
	}

}

/**
 * 用户和classic存在多对多关系
 */
Favor.init({
	uid: Sequelize.INTEGER,
	artId: Sequelize.INTEGER,
	type: Sequelize.INTEGER,
}, {
	sequelize: db,
	tableName: 'favor'
})

module.exports = {
	Favor
}
