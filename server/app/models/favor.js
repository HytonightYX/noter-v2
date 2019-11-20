const {db} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')
const {Art} = require('../models/art')


/**
 * Favor业务表
 * 记录某用户是否对某期刊点赞
 */
class Favor extends Model {

	/**
	 * 点赞
	 * 多个步骤必须作为一个事务,保证数据一致性
	 * ACID 原子性/一致性/隔离性/持久性
	 * @param artId
	 * @param type
	 * @param uid
	 * @returns {Promise<void>}
	 */
	static async like(artId, type, uid) {
		const favor = await Favor.findOne({
			where: {artId, type, uid}
		})

		// 当前用户已经点过赞了
		if (favor) {
			throw new global.errs.LikeError()
		}

		// return db.transaction
		db.transaction(async t => {
			// 添加记录
			await Favor.create({
				artId, type, uid
			}, {
				transaction: t
			})

			const art = await Art.getData(artId, type, false)

			// 对art实体中的favNums字段进行 +1 操作
			return await art.increment('favNums', {by: 1, transaction: t})
		})
	}

	/**
	 * 取消点赞
	 * @param artId
	 * @param type
	 * @param uid
	 * @returns {Promise<void>}
	 */
	static async dislike(artId, type, uid) {
		const favor = await Favor.findOne({
			where: {artId, type, uid}
		})

		// 当前用户还没点过赞,自然不能取消点赞
		if (!favor) {
			throw new global.errs.DislikeError()
		}

		// return db.transaction
		db.transaction(async t => {
			// 添加记录
			await favor.destroy({
				// true 硬删除/false 软删除
				force: true,
				transaction: t,
			})

			const art = await Art.getData(artId, type, false)

			// 对art实体中的favNums字段进行 +1 操作
			return await art.decrement('favNums', {by: 1, transaction: t})
		})
	}

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
