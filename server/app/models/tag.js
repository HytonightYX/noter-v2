const {Sequelize, Model, Op} = require('sequelize')
const {db} = require('../../core/db')

class Tag extends Model {
    static async showTags() {
        return await Tag.findAll({
            where: {
                author: 0
            }
        })
    }

    static async addTags(name, author) {
        return await Tag.create({
            name: name,
            author: author
        })
    }
}

Tag.init({
    // 记录Id
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // TAG名称
    name: Sequelize.STRING(100),
    author: Sequelize.INTEGER
}, {
    sequelize: db,
    tablename: 'tag'
})

module.exports = {Tag}