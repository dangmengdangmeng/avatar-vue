<template>
    <div class="model-item" :class="[`model-item-${modelIndex > 0 ? 'right':'left'}`]"
         :style="{left:`${(Number(modelIndex) * Number(canvasWidth))+Number(left)}px`}">
        <div v-if="videoLoadFail">{{videoLoadFailText}}</div>
        <div id="loading" v-show="isLoading">
            <span id="status">加载 PoseNet 模型...</span>
        </div>
        <div class="canvas-container" :style="{width:canvasWidth+'px',height:canvasHeight+'px'}">
            <div class="video-canvas" id="main" v-show="isMain">
                <video ref="videoEle" playsinline style="display: none;"></video>
                <canvas ref="outputs"></canvas>
                <canvas ref="keyPoints"></canvas>
            </div>
            <canvas ref="illustrationCanvas"></canvas>
        </div>
    </div>
</template>
<script>
    import * as posenet_module from '@tensorflow-models/posenet'
    import * as facemesh_module from '@tensorflow-models/facemesh'
    import * as tf from '@tensorflow/tfjs'
    import * as paper from 'paper'
    import "babel-polyfill"
    import {cloneDeepWith} from "lodash"
    import {
        isMobile,
        toggleLoadingUI,
        setStatusText
    } from '../../utils/demoUtils'
    import {SVGUtils} from '../../utils/svgUtils'
    import {PoseIllustration} from '../../illustrationGen/illustration'
    import {Skeleton} from '../../illustrationGen/skeleton'
    import UploadFile from "../UploadFile"

    export default {
        name: "ModelItem",
        components: {UploadFile},
        props: {
            svgUrl: {
                type: String,
                default: null
            },
            fileUrl: {
                default: null
            },
            modelIndex: {
                type: String,
                default: "0"
            },
            left: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                videoLoadFail: false,
                videoLoadFailText: '',
                video: null,
                videoWidth: 100,
                videoHeight: 150,
                faceDetection: null,
                canvasScope: null,
                canvasWidth: 550,
                canvasHeight: 420,
                posenet: null,
                illustration: null,
                minPoseConfidence: 0.15,
                minPartConfidence: 0.1,
                nmsRadius: 30.0,
                mobile: false,
                defaultPoseNetArchitecture: 'MobileNetV1',
                defaultQuantBytes: 2,
                defaultMultiplier: 1.0,
                defaultStride: 16,
                defaultInputResolution: 200,
                isLoading: false,
                isMain: false,
                clonePaper: cloneDeepWith(paper)
            }
        },
        mounted() {
            this.bindPage()
        },
        methods: {
            async bindPage() {
                this.setupCanvas()
                toggleLoadingUI(true, this)
                setStatusText('加载 PoseNet 模型...')
                this.posenet = await posenet_module.load({
                    architecture: this.defaultPoseNetArchitecture,
                    outputStride: this.defaultStride,
                    inputResolution: this.defaultInputResolution,
                    multiplier: this.defaultMultiplier,
                    quantBytes: this.defaultQuantBytes
                })
                setStatusText('加载 FaceMesh 模型...')
                const facemesh = await facemesh_module.load()
                setStatusText('加载 头像文件...')
                await this.parseSVG(this.svgUrl)
                setStatusText('设置输入数据...')
                try {
                    this.video = await this.loadVideo()
                } catch (e) {
                    this.videoLoadFail = true
                    this.videoLoadFailText = '该设备不支持, ' + '或者该浏览器不支持视频捕获: ' + e.toString()
                    throw e
                }
                toggleLoadingUI(false, this)
                this.detectPoseInRealTime(facemesh)
            },

            setupCanvas() {
                this.mobile = isMobile()
                if (this.mobile) {
                    this.canvasWidth = Math.min(window.innerWidth, window.innerHeight)
                    this.canvasHeight = this.canvasWidth
                    this.videoWidth *= 0.7
                    this.videoHeight *= 0.7
                }
                this.canvasScope = this.clonePaper
                let canvas = this.$refs.illustrationCanvas
                canvas.width = this.canvasWidth
                canvas.height = this.canvasHeight
                this.canvasScope.setup(canvas)
            },
            async parseSVG(target) {
                const svgScope = await SVGUtils.importSVG(target)
                const skeleton = new Skeleton(svgScope)
                this.illustration = new PoseIllustration(this.canvasScope)
                this.illustration.bindSkeleton(skeleton, svgScope)
            },
            detectPoseInRealTime(facemesh) {// 将图像输入posenet来估计姿势
                const canvas = this.$refs.outputs
                const keypointCanvas = this.$refs.keyPoints
                const videoCtx = canvas.getContext('2d')
                const keypointCtx = keypointCanvas.getContext('2d')
                canvas.width = this.videoWidth
                canvas.height = this.videoHeight
                keypointCanvas.width = this.videoWidth
                keypointCanvas.height = this.videoHeight
                let that = this

                async function poseDetectionFrame() {
                    let poses = []
                    videoCtx.clearRect(0, 0, that.videoWidth, that.videoHeight)
                    // 画出视频
                    videoCtx.save()
                    videoCtx.scale(-1, 1)
                    videoCtx.translate(-that.videoWidth, 0)
                    videoCtx.drawImage(that.video, 0, 0, that.videoWidth, that.videoHeight)
                    videoCtx.restore()

                    // 从图像生成一个张量
                    const input = tf.browser.fromPixels(canvas)
                    that.faceDetection = await facemesh.estimateFaces(input, false, false)
                    let all_poses = await that.posenet.estimatePoses(that.video, {
                        flipHorizontal: true,
                        decodingMethod: 'multi-person',
                        maxDetections: 1,
                        scoreThreshold: that.minPartConfidence,
                        nmsRadius: that.nmsRadius
                    })
                    poses = poses.concat(all_poses)
                    input.dispose()

                    keypointCtx.clearRect(0, 0, that.videoWidth, that.videoHeight)
                    that.canvasScope.project.clear()
                    if (poses.length >= 1 && that.illustration) {
                        Skeleton.flipPose(poses[0])
                        if (that.faceDetection && that.faceDetection.length > 0) {
                            let face = Skeleton.toFaceFrame(that.faceDetection[0])
                            that.illustration.updateSkeleton(poses[0], face)
                        } else {
                            that.illustration.updateSkeleton(poses[0], null)
                        }
                        that.illustration.draw(that.canvasScope, that.videoWidth, that.videoHeight)
                    }
                    let canvasScopes = that.canvasScope
                    that.canvasScope.project.activeLayer.scale(
                        that.canvasWidth / that.videoWidth,
                        that.canvasHeight / that.videoHeight,
                        new canvasScopes.Point(0, 0)
                    )
                    requestAnimationFrame(poseDetectionFrame.bind(this))
                }

                poseDetectionFrame()
            },

            async loadVideo() {
                const video = await this.setupCamera()
                video.play()
                return video
            },
            async setupCamera() {// 加载一个要在演示中使用的摄像头
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    throw new Error('Browser API navigator.mediaDevices.getUserMedia not available')
                }
                const video = this.$refs.videoEle
                this.video = video
                video.width = this.videoWidth
                video.height = this.videoHeight
                video.src = this.fileUrl
                return new Promise((resolve) => {
                    video.onloadeddata = () => {
                        resolve(video)
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus">
    .model-item
        position absolute
        left 0
        top 0
        display flex
        flex-direction column

        .canvas-container
            display: flex;
            flex-direction column
            position: relative;

    .model-item-right
        .video-canvas
            display flex
            align-items center
            justify-content flex-end
</style>
