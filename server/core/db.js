const Sequelize = require('sequelize')
const { dbName, user, pwd, host, port } = require('../config/config').database
const { Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')

const db = new Sequelize(dbName, user, pwd, {
	dialect: 'mysql',     	// 数据库类型
	host: host,
	port: port,
	logging: false,        	// console中是否显示具体sql
	timezone: '+08:00',   	// 设置东八时区,重要
	define: {
		timestamps: true,
		paranoid: true,
		underscored: true, 		// 自动将驼峰转下划线
		scopes: {
			noTS: {
				attributes: {
					exclude: ['updatedAt', 'deletedAt', 'createdAt']
				}
			}
		}
	}
})

db.sync({
	force: false
})

/**
 * 全局:返回的时候删除三个时间戳
 * 功能简单粗暴单一
 */
Model.prototype.toJSON = function () {
	let data = clone(this.dataValues)
	unset(data, 'updatedAt')
	unset(data, 'createdAt')
	unset(data, 'deletedAt')

	for (let key in data) {
		if (key === 'image') {
			data[key] = global.config.host + data[key]
		}
	}

	// 待删除字段
	if (isArray(this.exclude)) {
		this.exclude.forEach(val => {
			unset(data, val)
		})
	}

	return data
}

module.exports = { db }

