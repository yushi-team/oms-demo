<template>
    <el-container>
        <el-menu
            :unique-opened="true"
            :router="true"
            :collapse="isCollapse"
            class="elMenu g-tl g-height g-fs-20"
            text-color="#fff"
            background-color="#304156"
            active-text-color="#ff9234"
            :default-active="$route.name">
            <submenu-item v-for="item in menus" :key="item.actionId" :item="item"/>
        </el-menu>
        <el-container>
            <navbar />
        </el-container>
    </el-container>
</template>

<script>
import submenuItem from './children/submenu-item'
import navbar from './children/navbar'
export default {
    components: {
        submenuItem,
        navbar
    },
    data () {
        return {
            isCollapse: false,
            menus: []
        }
    },
    created () {
        this.initMenu()
    },
    methods: {
        initMenu () {
            this.$apis.initMenu().then(res => {
                if (res.code === '2000') {
                    this.menus = res.data
                }
            }).catch(error => {
                console.error(error.message)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.elMenu {
    width: 200px;
    color: rgba(12, 12, 12, .2);
}
</style>
