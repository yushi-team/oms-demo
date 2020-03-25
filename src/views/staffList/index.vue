<template>
    <div class="login g-relative">
        员工列表
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="container clearfix g-absolute-center g-br-10 g-pd-20"
            autocomplete="on"
            label-position="left"
        >
            <h1 class="g-c-fff">{{$common.brandName}}后台管理系统</h1>
            <el-form-item prop="username">
                <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                    prefix-icon="el-icon-user"
                />
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType ? 'password' : ''"
                    placeholder="Password"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    prefix-icon="el-icon-lock"
                    @keyup.enter.native="handleLogin"
                >
                    <span
                        slot="suffix"
                        class="g-m-r-10 g-pointer"
                        @click="passwordType = !passwordType"
                    >
                        <svg-icon :iconName="passwordType ? 'open-eye' : 'close-eye'" />
                    </span>
                </el-input>
            </el-form-item>
            <el-button
                :loading="loading"
                type="primary"
                class="g-width g-m-t-30"
                @click.native.prevent="handleLogin"
            >登陆</el-button>
        </el-form>
    </div>
</template>

<script>
// import { commonModule, COMMON_USERINFO } from '@/store/modules/common'
export default {
    name: 'staffList',
    data () {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
                password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
            },
            passwordType: true,
            loading: false
        }
    },
    methods: {
        handleLogin () {
            this.loading = true
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$apis.login({
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    }).then(res => {
                        this.loading = false
                        if (res.code === '2000') {
                            this.$router.replace('/welcome')
                            // this.$store.dispatch(`${commonModule.name}/${COMMON_USERINFO}`, res.data)
                        }
                    }).catch(error => {
                        this.loading = false
                        this.$message.error(error.message)
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>
