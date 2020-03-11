// 不同环境的请求配置
const prodConfigs = {
    'app.wogame-dev': {
        apiHost: 'http://appservice.wogame-dev.com',
        domain: 'http://app.wogame-dev.com',
        staticHost: '',
        vconsole: true
    },
    'app.wogame-test': {
        apiHost: 'http://appservice.wogame-test.com',
        domain: 'http://app.wogame-test.com',
        staticHost: '',
        vconsole: false
    }
}
// 本地默认
const devConfig = {
    apiHost: 'http://yapi.youximao.cn/mock/613',
    domain: 'http://app.wogame-dev.com',
    staticHost: '',
    vconsole: true
}
const hostConfig = prodConfigs[location.hostname] || devConfig
export default hostConfig
