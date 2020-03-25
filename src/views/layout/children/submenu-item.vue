<template>
    <div>
        <el-submenu v-if="item.subNav && item.subNav.length > 0" :key="item.actionId" :index="item.link">
            <template slot="title">
                <i :class="item.icon" class="g-fs-20 g-m-r-5" />
                <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item
                v-for="childItem in item.subNav"
                :key="childItem.actionId"
                :index="childItem.link"
                style="padding-left: 45px">
                {{childItem.name}}
            </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="item.actionId" :index="item.link">
            <i :class="item.icon" class="g-fs-20 g-m-r-5"/>
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: 'submenu-item',
    props: {
        item: {
            type: Object,
            required: true,
            default () {
                return {}
            }
        }
    }
}
</script>
