const {Sequelize, Model} = require('sequelize')
const {db} = require('../../core/db')

class Note extends Model {

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
    // 内容
    content: Sequelize.TEXT,
    // 图片路径
    images: Sequelize.STRING(500),
    // 作者Id
    writerId: Sequelize.INTEGER
}, {
	sequelize: db,
	tableName: 'note'
})

module.exports = {Note}