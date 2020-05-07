<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    mounted () {
        const time = new Date() * 1
        const connectStart = window.performance.timing.connectStart
        const responseStart = window.performance.timing.responseStart
        console.log(1, responseStart - connectStart)
        console.log(2, time - connectStart)
    }
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

body {
    margin: 0;
}
</style>
