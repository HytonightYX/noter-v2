module.exports = {
	env: 'dev',
	// env: 'prod',
	database: {
		dbName: 'noter',
		host: '101.37.14.191',
		port: 3306,
		user: 'noter',
		pwd: 'noter'
	},
	security: {
		secretKey: 'abcdefg',        // 秘钥
		expiresIn: 60 * 60 * 24 * 30,   // 令牌过期时间 一个月
	},
	github: {
		client_id: 'af0e6151dbd9588a9e66',
		scope: 'user:email',
		client_secret: '4b0ae67ca84bacbe8d8a505c1e2064cdf5bd030a'
	},
	wx: {
		appId: 'wx55b5e6eac0880945',
		appSecret: '4f3c874f2d9ac51d5dbf4ee82aa8dd1a',
		loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
	},
	host: 'http://localhost:3030/'
}
