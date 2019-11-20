const {Movie, Music, Sentence} = require('./classic')
const {Op} = require('sequelize')
const {flatten} = require('lodash')

class Art {
	static async getData(artId, type, useScope=true) {
		let art = null
		const scope = useScope ? 'noTS' : null
		const condition = {
			where: {id: artId}
		}

		switch (type) {
			case 100:
				// art = await Movie.scope('noTS').findOne(condition)
				art = await Movie.scope(scope).findOne(condition)
				break
			case 200:
				art = await Music.scope(scope).findOne(condition)
				break
			case 300:
				art = await Sentence.scope(scope).findOne(condition)
				break
			case 400:
				// 局部导入,避免循环导入
				const {Book} = require('./book')
				art = await Book.scope(scope).findOne(condition)
				if (!art) {
					art = await Book.create({
						id: artId,
					})
				}
				break
			default:
				break
		}

		return art
	}

	/**
	 * 根据artInfoList查出一组art列表
	 * @param artInfoList
	 * @returns {Promise<Array>}
	 */
	static async getList(artInfoList) {
		// 3种 art 类型
		// 3次 in 查询
		const artInfoObj = {
			100: [],
			200: [],
			300: [],
		}

		const res = []

		for (let artInfo of artInfoList) {
			artInfoObj[artInfo.type].push(artInfo.artId)
		}

		for (let key in artInfoObj) {
			const ids = artInfoObj[key]

			if (ids.length > 0) {
				key = parseInt(key)
				res.push(await Art._getListByType(ids, key))
			}
		}

		// lodash:二维数组转一位数组
		return flatten(res)
	}

	static async _getListByType(ids, type) {
		let arts = []
		const scope = null
		const condition = {
			where: {
				id: {
					[Op.in]: ids    // 进行in查询
				}
			}
		}

		switch (type) {
			case 100:
				// art = await Movie.scope('noTS').findOne(condition)
				arts = await Movie.findAll(condition)
				break
			case 200:
				arts = await Music.scope(scope).findAll(condition)
				break
			case 300:
				arts = await Sentence.scope(scope).findAll(condition)
				break
			case 400:
				//TODO: Book的相关逻辑
				break
			default:
				break
		}

		return arts
	}
}

module.exports = {
	Art
}
