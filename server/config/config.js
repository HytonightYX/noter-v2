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
		secretKey: "abcdefg",        // 秘钥
		expiresIn: 60 * 60 * 24 * 30,   // 令牌过期时间 一个月
	},
	wx: {
		appId: 'wx55b5e6eac0880945',
		appSecret: '4f3c874f2d9ac51d5dbf4ee82aa8dd1a',
		loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
	},
	yushu: {
		detailUrl: 'http://t.yushu.im/v2/book/id/%s',
		keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
	},
	host:'http://localhost:3030/'
}
