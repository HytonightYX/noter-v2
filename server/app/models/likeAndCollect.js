const {Sequelize, Model} = require('sequelize')
const {db} = require('../../core/db')

const commonField = {
    // 记录ID
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
    },
    // 用户id
    userId: Sequelize.INTEGER,
    // 文章id
    noteId: Sequelize.INTEGER
}

class Like extends Model {

}

Like.init(commonField, {
    sequelize: db,
	tableName: 'like'
})

class Collection extends Model {

}

Collection.init(commonField, {
    sequelize: db,
	tableName: 'collection'
})

module.exports = {
    Like,
    Collection
}