/**
 * 公共使用的接口
 */
import { createAPI } from '../setup'
import hostConfig from '../config'
const COMMON = {
    initMenu: (data) => createAPI(`${hostConfig.apiHost}/getMenus`, 'post', data),
    userInfo: (data) => createAPI(`${hostConfig.apiHost}/userInfo`, 'post', data)
}
export default COMMON
