/**
 * 登录模块
 */
import { createAPI } from '../setup'
import hostConfig from '../config'
const LOGIN = {
    login: (data) => createAPI(`${hostConfig.apiHost}/login`, 'post', data),
    logout: (data) => createAPI(`${hostConfig.apiHost}/logout`, 'post', data)
}
export default LOGIN
