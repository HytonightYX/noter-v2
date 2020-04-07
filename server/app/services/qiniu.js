const qiniu = require('qiniu')

qiniu.conf.ACCESS_KEY = '25E0vVorHfwQElXxDFiyo3dydVPg7gpmAy7eRjrt'
qiniu.conf.SECRET_KEY = 'gZGcGt_5JWW2OltCOl_cGfnH18VPcLNsHWSK3OoP'
const bucket = 'noter-v2'

const getToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket
  })
  return putPolicy.uploadToken()
}

module.exports = { getToken }