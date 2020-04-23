import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: {
            name: 'welcome'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login/index.vue'], resolve)
    },
    {
        path: '/layout',
        name: 'layout',
        component: resolve => require(['@/views/layout/index.vue'], resolve),
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: resolve => require(['@/views/welcome/index.vue'], resolve)
            }, {
                path: '/companyManage',
                redirect: '/companyList',
                meta: {
                    title: '员工管理',
                    keepAlive: true
                },
                children: [
                    {
                        path: '/companyList',
                        name: 'companyList',
                        component: resolve => require(['@/views/companyList/index.vue'], resolve),
                        meta: {
                            preTitle: '员工管理',
                            title: '公司列表',
                            keepAlive: true
                        }
                    },
                    {
                        path: '/staffList',
                        name: 'staffList',
                        component: resolve => require(['@/views/staffList/index.vue'], resolve),
                        meta: {
                            preTitle: '员工管理',
                            title: '员工列表',
                            keepAlive: true
                        }
                    }
                ]
            }, {
                path: '/syncManage',
                name: 'syncManage',
                component: resolve => require(['@/views/syncManage/index.vue'], resolve),
                meta: {
                    title: '同步管理',
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '*',
        name: '404',
        component: resolve => require(['@/views/404/index.vue'], resolve)
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
