import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './components'
import './assets'

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
