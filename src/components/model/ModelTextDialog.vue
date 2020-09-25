<template>
    <div class="model-text-dialog" :style="{left:x+'px',top:y+'px'}">
        <slot></slot>
        <div class="triangle" :class="[`triangle-${type}`]"></div>
    </div>
</template>

<script>
    export default {
        name: "ModelTestDialog",
        props: {
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            type: {
                type: String,
                default: "left"
            }
        }
    }
</script>

<style scoped lang="stylus">
    mainColor = #999
    .model-text-dialog
        max-width 200px
        position fixed
        left 40px
        top 40px
        background mainColor
        box-sizing border-box
        padding 20px
        border-radius 5px
        color #fff

        .triangle
            position absolute
            bottom -19px
            width 0
            height 0
            border 10px solid transparent
            border-top-width 18px
            border-top-color mainColor

        .triangle-left
            left -10px
            transform rotate(35deg)

        .triangle-right
            right -10px
            transform rotate(-35deg)

</style>
