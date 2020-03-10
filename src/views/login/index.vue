<template>
    <div class="login">
        <div class="box clearfix">
            <h1>{{$common.brandName}}</h1>
        </div>
    </div>
</template>

<script>
// import { commonModule, COMMON_USERINFO } from '@/store/modules/common'
export default {
    name: 'login',
    data () {
        return {
            userIcon: 'icon-user',
            pwdIcon: 'icon-pwd',
            account: '',
            password: '',
            showError: false,
            errorMsg: '',
            disabled: false
        }
    },
    methods: {
        login () {
            // this.$validator.validateAll().then((valid) => {
            //     if (valid) {
            //         let data = {
            //             'account': this.account,
            //             'password': this.password
            //         }
            //         this.disabled = true
            //         this.$apis.login(data).then(res => {
            //             this.disabled = false
            //             if (res.code === '2000') {
            //                 // this.$parent.$emit('initMenu', this.account)
            //                 localStorage.operatorId = res.data
            //                 this.$router.replace('/welcome')
            //                 this.$store.dispatch(`${commonModule.name}/${COMMON_USERINFO}`, res.data)
            //             } else {
            //                 this.showError = true
            //                 this.errorMsg = res.message
            //             }
            //         }).catch(error => {
            //             this.disabled = false
            //             this.$message.error(error.message)
            //         })
            //     }
            // })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    height: 100vh;
    background: url(../../assets/img/bg.jpg) no-repeat center center;
    background-size: cover;
}
</style>
