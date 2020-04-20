import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components'
import './assets'
import apis from './api/index'

Vue.config.productionTip = false
Vue.use(Element)
Vue.prototype.$apis = apis

// vue原型挂载 - 初始化平台信息
Vue.prototype.$brandInfo = {
    brandId: 1,
    brandName: '宇石'
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
