<template>
    <div class="model-show">
        <div class="content">
            <model-item v-if="leftConfig.fileUrl"
                        :svg-url="leftConfig.svgUrl"
                        :file-url="leftConfig.fileUrl"
                        :is-mute="leftConfig.isMute"
                        model-index="0"/>
            <model-item v-if="rightConfig.fileUrl"
                        model-index="1"
                        left="-200"
                        :svg-url="rightConfig.svgUrl"
                        :file-url="rightConfig.fileUrl"
                        :is-mute="rightConfig.isMute"/>
        </div>
    </div>
</template>

<script>
    import ModelItem from "../../components/model/ModelItem"

    export default {
        name: "ModelShow",
        components: {ModelItem},
        data() {
            return {
                leftConfig: {
                    svgUrl: null,
                    fileUrl: require('../../assets/mp4/girl.mp4'),
                    isMute: false
                },
                rightConfig: {
                    svgUrl: null,
                    fileUrl: require('../../assets/mp4/girl.mp4'),
                    isMute: true
                }
            }
        },
        mounted() {
            const svgUrl = this.$route.params.url
            this.leftConfig.svgUrl = svgUrl
            this.rightConfig.svgUrl = svgUrl
        }
    }
</script>

<style scoped lang="stylus">
    .model-show
        .top
            padding 10px 0
            display flex
            align-items center
            justify-content space-around

        .content
            position relative
            width 100%
</style>
