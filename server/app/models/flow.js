const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class Flow extends Model {

}

/**
 * type + art_id 确定某张实体表的某个实体
 */
Flow.init({
	index: Sequelize.INTEGER,     // 期刊序号
	artId: Sequelize.INTEGER,    // 实体id号
	type: Sequelize.INTEGER,      // 实体类型 100 movie/200 music/300 sentence
}, {
	sequelize: db,
	tableName: 'flow'
})

module.exports = {Flow}
