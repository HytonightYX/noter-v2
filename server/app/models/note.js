const {Sequelize, Model, Op} = require('sequelize')
const {db} = require('../../core/db')


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
            writerId: this.writerId,
            tag: this.tag
        };
        return origin;
    }

    /**
     * 新增文章,存草稿或者直接发布
     * @param title 文章标题
     * @param raw  文章内容json
     * @param html 文章内容html
     * @param writerId 作者id
     * @param tag 文章类型
     * @param status 1-草稿，2-发布
     */
    static async addNote(title, raw, html, writerId, tag, status) {
        return await Note.create({
            title: title,
            raw: raw,
            html: html,
            writerId: writerId,
            tag: tag,
            status: status
        })
    }

    static async queryNoteByTitle(title) {
        return await Note.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`
                }
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
    writerId: Sequelize.INTEGER,
    // 文章类型
    tag: Sequelize.INTEGER,
    // 所处状态
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1 //处于草稿状态
    }
}, {
	sequelize: db,
	tableName: 'note'
})

module.exports = {Note}