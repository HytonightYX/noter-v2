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
            author: this.writerId,
            tag: this.tag,
            likeNum: this.likeNum,
            collectNum: this.collectNum
        };
        return origin;
    }

    /**
     * 新增文章,存草稿或者直接发布
     * @param title 文章标题
     * @param raw  文章内容json
     * @param html 文章内容html
     * @param author 作者id
     * @param tag 文章类型
     * @param status 1-草稿，2-发布
     */
    static async addNote(note) {
        return await Note.create({
            ...note
        })
    }

    /**
     * 按更新时间降序排序
     */
    static async showAllNotes() {
        return await Note.findAll({
            order: [
                ['updatedAt', 'DESC']
            ]
        })
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
     * @param {*用户ID} id 
     */
    static async queryNoteById(id) {
        return await Note.findAll({
            where: {
                author: id
            },
            order: [
                ['updatedAt', 'DESC']
            ]
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

module.exports = {Note}