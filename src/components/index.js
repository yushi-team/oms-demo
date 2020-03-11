import Vue from 'vue'
import SvgIcon from './SvgIcon/index.vue'
[SvgIcon].forEach(item => {
    Vue.component(item.name, item)
})
