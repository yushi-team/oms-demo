<template>
    <div class="login g-relative">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="container clearfix g-absolute-center g-br-10 g-pd-30"
            autocomplete="on"
            label-position="left">
            <h1 class="g-c-fff">{{ $common.brandName }}后台管理系统</h1>
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
                    @keyup.enter.native="handleLogin">
                    <span
                        slot="suffix"
                        class="g-m-r-10 g-pointer"
                        @click="passwordType = !passwordType">
                        <svg-icon :iconName="passwordType ? 'open-eye' : 'close-eye'" />
                    </span>
                </el-input>
            </el-form-item>
            <el-button
                :loading="loading"
                type="primary"
                class="g-width"
                @click.native.prevent="handleLogin"
            >{{loading? '登陆中' : '登陆'}}</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'login',
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
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$apis.login({
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    }).then(res => {
                        this.loading = false
                        if (res.code === '2000') {
                            this.$router.replace('/welcome')
                        }
                    }).catch(error => {
                        this.loading = false
                        console.log(error.message)
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    height: 100vh;
    background: url(../../assets/images/bg.jpeg) no-repeat center center;
    background-size: cover;

    .container {
        width: 400px;
        height: 300px;
        margin-top: 15%;
        background: rgba(255, 255, 255, .5);
    }
}
</style>
