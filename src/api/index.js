import COMMON from './modules/common'
import LOGIN from './modules/login'

/**
 * 所有接口引用入口
 */
const apis = {
    ...COMMON,
    ...LOGIN
}
export default apis
