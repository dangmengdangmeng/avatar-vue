<template>
    <div class="model-test">
        <div class="top">
            <upload-file @file="getLeftFile"/>
            <upload-file @file="getRightFile"/>
        </div>
        <div class="content">
            <model-item v-if="leftConfig.fileUrl"
                        :svg-url="leftConfig.svgUrl"
                        :file-url="leftConfig.fileUrl"
                        model-index="0"/>
            <model-item v-if="rightConfig.fileUrl"
                        model-index="1"
                        left="-200"
                        :svg-url="rightConfig.svgUrl"
                        :file-url="rightConfig.fileUrl"/>
        </div>
    </div>
</template>

<script>
    import ModelItem from "../../components/model/ModelItem"
    // import * as boySVG from '../../assets/svg/boy.svg'
    import * as boySVG from '../../assets/svg/boy500.svg'
    import UploadFile from "../../components/UploadFile"

    export default {
        name: "ModelTest",
        components: {UploadFile, ModelItem},
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
            this.leftConfig.svgUrl = boySVG
            this.rightConfig.svgUrl = boySVG
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
    .model-test
        .top
            padding 10px 0
            display flex
            align-items center
            justify-content space-around

        .content
            position relative
            width 100%
</style>
