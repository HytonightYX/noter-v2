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
		// client_id: '907e089d8acd7d59d6ea',
		client_id: '00d361bef1a3c27055fd',
		scope: 'user:email',
		// client_secret: '92a7d98f5aa002ec45f5bfac5e97edcf714c5afe'
		client_secret: '9a7efb5b81836dbf6863cff95aff47d2e746110d'
	},
	wx: {
		appId: 'wx55b5e6eac0880945',
		appSecret: '4f3c874f2d9ac51d5dbf4ee82aa8dd1a',
		loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
	},
	host: 'http://localhost:3030/'
}
