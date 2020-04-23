<template>
    <div class="g-vh g-bg-eee">
        <div class="main">
            <div class="container">
                <div class="pic-404">
                    <img class="pic-404__parent" src="@/assets/images/404.png" alt="404">
                    <img class="pic-404__child left" src="@/assets/images/404_cloud.png" alt="404">
                    <img class="pic-404__child mid" src="@/assets/images/404_cloud.png" alt="404">
                    <img class="pic-404__child right" src="@/assets/images/404_cloud.png" alt="404">
                </div>
                <div class="bullshit">
                    <div class="bullshit__oops">OOPS!</div>
                    <div class="bullshit__headline">{{ message }}</div>
                    <a href="/welcome" class="bullshit__return-home g-tc">返回首页</a>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

export default {
    name: 'Page404',
    computed: {
        message () {
            return '<("""O""")> 糟糕，我迷路了～'
        }
    }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
