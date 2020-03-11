/**
 * 登录模块
 */
import { createAPI } from '../setup'
import hostConfig from '../config'
const LOGIN = {
    // 获取我的首页所有数据
    login: (data) => createAPI(`${hostConfig.apiHost}/login`, 'post', data)
}
export default LOGIN
