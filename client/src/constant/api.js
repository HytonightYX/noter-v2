export const API_BASE = "http://127.0.0.1:8080/"
const _api = (endpoint) => API_BASE + endpoint

export const USER_LIST = _api("user")
