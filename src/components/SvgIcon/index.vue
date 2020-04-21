<template>
    <svg
        class="svg-icon"
        :class="classes"
        aria-hidden="true"
        @click="_click">
        <use :xlink:href="`#icon-${iconName}`" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            required: true
        },
        classes: {
            type: String,
            required: false
        }
    },
    methods: {
        _click () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="less" scoped>
.svg-icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -.3em;
    fill: currentColor;
    overflow: hidden;
}
</style>
