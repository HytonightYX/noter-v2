import qiniu from 'qiniu'
import secret from '../secret'
const Qiniu = secret.qiniu

qiniu.conf.ACCESS_KEY = Qiniu.AccessKey
qiniu.conf.SECRET_KEY = Qiniu.SecretKey
const bucket = 'noter-v2'

export const getToken = () => {
	const putPolicy = new qiniu.rs.PutPolicy({
		scope: bucket
	})
	return putPolicy.uploadToken()
}
