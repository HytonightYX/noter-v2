import secret from '../secret'

export const MENU_MAIN = [
	{ title: '发现', icon: 'lightbulb outline', path: '/' },
	{ title: '我的笔记', icon: 'book', path: '/mynote' },
]

export const FIND_MENU = [
	{ title: '所有', key: 'all', icon: '' },
	{ title: '标签', key: 'tag', icon: '' }
]

export const SYSTEM_CONFIG = {
	github: {
		// client_id: '907e089d8acd7d59d6ea',
		client_id: '00d361bef1a3c27055fd',
		scope: 'user:email'
	},
	qiniu: {
		AccessKey: '25E0vVorHfwQElXxDFiyo3dydVPg7gpmAy7eRjrt',
		SecretKey: secret.qiniu.SecretKey,
		BASE_QINIU_URL: 'http://qn-noter.yunxi.site/',
		QINIU_SERVER: 'https://upload-z2.qiniup.com'
	}
}
