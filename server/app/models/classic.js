const {db} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

const classicFields = {
	image: Sequelize.STRING,
	content: Sequelize.STRING,
	pubdate: Sequelize.DATEONLY,
	favNums: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	title: Sequelize.STRING,
	type: Sequelize.TINYINT,
}

class Movie extends Model {

}

Movie.init(classicFields,
	{
		sequelize: db,
		tableName: 'movie'
	}
)

class Sentence extends Model {

}

Sentence.init(classicFields,
	{
		sequelize: db,
		tableName: 'sentence'
	}
)

class Music extends Model {

}

const musicFields = Object.assign({url: Sequelize.STRING}, classicFields)

Music.init(musicFields,
	{
		sequelize: db,
		tableName: 'music'
	}
)

module.exports = {
	Movie,
	Sentence,
	Music
}
