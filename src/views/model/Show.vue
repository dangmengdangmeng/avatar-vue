<template>
    <div class="model-show">
        <div class="top">
            <upload-file @file="getLeftFile"/>
            <upload-file @file="getRightFile"/>
        </div>
        <div class="content">
            <model-item v-if="leftConfig.svgUrl && leftConfig.fileUrl"
                        :svg-url="leftConfig.svgUrl"
                        :file-url="leftConfig.fileUrl"
                        model-index="0"/>
            <model-item v-if="rightConfig.svgUrl && rightConfig.fileUrl"
                        model-index="1"
                        left="-200"
                        :svg-url="rightConfig.svgUrl"
                        :file-url="rightConfig.fileUrl"/>
        </div>
    </div>
</template>

<script>
    import UploadFile from "../../components/UploadFile"
    import ModelItem from "../../components/model/ModelItem"

    export default {
        name: "ModelShow",
        components: {ModelItem, UploadFile},
        data() {
            return {
                leftConfig: {
                    svgUrl: null,
                    fileUrl: null
                },
                rightConfig: {
                    svgUrl: null,
                    fileUrl: null
                }
            }
        },
        mounted() {
            const svgUrl = this.$route.params.url
            this.leftConfig.svgUrl = svgUrl
            this.rightConfig.svgUrl = svgUrl
        },
        methods: {
            getLeftFile(file) {
                this.leftConfig.fileUrl = file
            },
            getRightFile(file) {
                this.rightConfig.fileUrl = file
            }
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
