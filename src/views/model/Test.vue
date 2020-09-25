<template>
    <div class="model-test">
        <div class="content">
            <model-item v-if="leftConfig.fileUrl"
                        :svg-url="leftConfig.svgUrl"
                        :file-url="leftConfig.fileUrl"
                        :is-mute="leftConfig.isMute"
                        model-index="0"
                        @startPlay="startTimer(leftScriptItem)"/>
            <model-item v-if="rightConfig.fileUrl"
                        model-index="1"
                        left="-200"
                        :svg-url="rightConfig.svgUrl"
                        :file-url="rightConfig.fileUrl"
                        :is-mute="rightConfig.isMute"
                        @startPlay="startTimer(rightScriptItem)"/>
        </div>
        <model-text-dialog :x="400" :y="38" type="left" v-if="leftScriptItem.curText">
            {{leftScriptItem.curText}}
        </model-text-dialog>

        <model-text-dialog :x="400" :y="38" type="right" v-if="rightScriptItem.curText">
            {{rightScriptItem.curText}}
        </model-text-dialog>
    </div>
</template>

<script>
    import ModelItem from "../../components/model/ModelItem"
    // import * as boySVG from '../../assets/svg/boy.svg'
    import * as boySVG from '../../assets/svg/new1.svg'
    import ModelTextDialog from "../../components/model/ModelTextDialog"

    export default {
        name: "ModelTest",
        components: {ModelTextDialog, ModelItem},
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
                },
                leftScriptItem: {
                    timer: null,
                    startTime: 0,
                    endTime: 10,
                    curText: null,
                    data: [
                        {
                            time: 1,
                            text: "左边第一句话"
                        },
                        {
                            time: 4,
                            text: null
                        },
                        {
                            time: 10,
                            text: null
                        }
                    ]
                },
                rightScriptItem: {
                    timer: null,
                    startTime: 0,
                    endTime: 10,
                    curText: null,
                    data: [
                        {
                            time: 5,
                            text: "右边第一句话"
                        },
                        {
                            time: 10,
                            text: null
                        }
                    ]
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
            },
            startTimer(options) {
                options.timer = setInterval(() => {
                    options.startTime += 1
                    this.filterScriptText(options)
                    if (options.startTime >= options.endTime) {
                        this.stopTimer(options)
                    }
                }, 1000)
            },
            stopTimer(options) {
                clearInterval(options.timer)
                options.timer = null
                options.startTime = 0
            },
            filterScriptText(options) {
                options.data.map(item => {
                    if (options.startTime === item.time) {
                        options.curText = item.text
                    }
                })
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
