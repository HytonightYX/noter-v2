import { SYSTEM_CONFIG } from '../constant/config'

export const API_BASE = "http://127.0.0.1:3030/"
// export const API_BASE = 'http://172.22.203.70:3030/v1/'
const _api = (endpoint) => API_BASE + endpoint

const CLIENT_ID = SYSTEM_CONFIG.github.client_id
const SCOPE = SYSTEM_CONFIG.github.scope

export const NOTE_LIST = _api('note')
export const USER_LIST = _api('user')
export const GITHUB_LOGIN = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
