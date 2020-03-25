<template>
    <div class="g-width">
        <el-header class="header g-flex g-jc-sb g-ai-c">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="layoutBreadcrumb">
                <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: getRoute($route.name)}" v-if="$route.meta && $route.meta.preTitle">{{ $route.meta.preTitle }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="$route.meta && $route.meta.title">{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
            <div>
                <label class="g-m-r-5">{{userInfo.userName}}</label>
                <svg-icon @click="handleSignOut" iconName="logout" />
            </div>
        </el-header>
        <el-main class="layoutHeader" height="48px">
            <label class="titleName">{{$brandInfo.brandName}}管理后台</label>
            <router-view />
        </el-main>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            userInfo: {
                userName: ''
            }
        }
    },
    watch: {
        '$route' (val) {
            console.log(val, 11)
        }
    },
    beforeMount () {
        this.getUserInfo()
    },
    methods: {
        getRoute (name) {
            const currentRoute = this.$route.matched.filter((item) => name === item.name)
            return currentRoute[0].parent.redirect
        },
        getUserInfo () {
            this.$apis.userInfo().then(res => {
                if (res.code === '2000') {
                    this.userInfo = res.data
                }
            }).catch(error => {
                console.error(error.message)
            })
        },
        handleSignOut () {
            this.$msgbox({
                title: '确认框',
                message: '确定要退出登录吗？',
                showCancelButton: true,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = 'loading...'
                        setTimeout(() => {
                            this.signOut()
                                .then(() => {
                                    instance.confirmButtonLoading = false
                                    done()
                                })
                                .catch(error => {
                                    console.log(error, 11)
                                })
                        }, 300)
                    } else {
                        done()
                    }
                }
            }).then(action => {
                this.$message({
                    type: 'success',
                    message: '退出登录成功'
                })
            }).catch(cancle => {
                // 点取消按钮
            })
        },
        signOut () {
            return new Promise((resolve, reject) => {
                this.$apis.logout().then(res => {
                    if (res.code === '2000') {
                        this.$router.push('/login')
                        resolve()
                    }
                }).catch(error => {
                    console.error(error.message)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    border-bottom: 1px solid #d8dce5;
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
        0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
</style>
