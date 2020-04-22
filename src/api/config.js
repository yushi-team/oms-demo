// 不同环境的请求配置
const prodConfigs = {
    'app.wogame-dev.com': {
        apiHost: 'http://appservice.wogame-dev.com'
    },
    'app.wogame-test.com': {
        apiHost: 'http://appservice.wogame-test.com'
    }
}

// 线上环境默认的配置
const defaultConfig = {
    apiHost: 'http://appservice.wogame-test.com'
}

// 本地默认
const localConfig = {
    // apiHost: 'http://appservice.wogame-dev.com',
    apiHost: 'http://yapi.youximao.cn/mock/613'
}
let hostConfig = prodConfigs[location.hostname] || defaultConfig
if (process.env.NODE_ENV === 'development') hostConfig = localConfig

export default hostConfig
