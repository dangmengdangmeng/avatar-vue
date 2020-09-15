<template>
    <div class="model-create">
        <div class="left">
            <PreviewModel
                    v-if="isInit"
                    :skin-color="skinColor"
                    :clothes-color="clothesColor"
                    :clothes-type="clothesType"
                    :eyes-type="eyesType"
                    :eyebrow-type="eyebrowType"
                    :mouth-type="mouthType"
                    :facial-hair-type="facialHairType"
                    :facial-hair-color="facialHairColor"
                    :accessories-type="accessoriesType"
                    :top-color="topColor"
                    :top-type="topType"
            />
        </div>
        <div class="right">
            <div class="top">
                <el-button @click="createSVG">生成图像</el-button>
                <el-button @click="pusToTest">体验动作</el-button>
            </div>
            <div class="content">
                <el-tabs type="border-card" v-if="allData">
                    <el-tab-pane label="身体">
                        <model-form-select :name="allData.body.skin.name" type='skin' :options="allData.body.skin"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="脸">
                        <model-form-select :name="allData.face.eyebrowType.name" type='eyebrow'
                                           :options="allData.face.eyebrowType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.face.eyeType.name" type='eye' :options="allData.face.eyeType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.face.mouthType.name" type='mouth'
                                           :options="allData.face.mouthType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.face.facialHairType.name" type='facialHairType'
                                           :options="allData.face.facialHairType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.face.facialHairColor.name" type='facialHairColor'
                                           :options="allData.face.facialHairColor"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="配饰">
                        <model-form-select :name="allData.accessories.accessoriesType.name" type='accessories'
                                           :options="allData.accessories.accessoriesType"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="头发或帽子">
                        <model-form-select :name="allData.header.headerType.name" type='headerType'
                                           :options="allData.header.headerType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.header.headerColor.name" type='headerColor'
                                           :options="allData.header.headerColor"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="衣服">
                        <model-form-select :name="allData.clothes.clothesType.name" type='clothesType'
                                           :options="allData.clothes.clothesType"
                                           @selected-item="updateData"/>
                        <model-form-select :name="allData.clothes.clothesColor.name" type='clothesColor'
                                           :options="allData.clothes.clothesColor"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="裤子">
                        <model-form-select :name="allData.trousers.trousersType.name" type='trousersType'
                                           :options="allData.trousers.trousersType"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                    <el-tab-pane label="鞋子">
                        <model-form-select :name="allData.shoes.shoesType.name" type='shoesType'
                                           :options="allData.shoes.shoesType"
                                           @selected-item="updateData"/>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import PreviewModel from "../../components/model/PreviewModel"
    import ChineseData from "../../languages/model/ChineseData"
    import ModelService from "../../services/model/ModelService"
    import ModelFormSelect from "../../components/model/ModelFormSelect"

    const ModelData = JSON.parse(JSON.stringify(ChineseData))
    export default {
        name: "ModelCreate",
        components: {
            ModelFormSelect,
            PreviewModel
        },
        data() {
            return {
                allData: null,
                skinColor: null,
                clothesType: null,
                clothesColor: null,
                eyesType: null,
                eyebrowType: null,
                mouthType: null,
                facialHairType: null,
                facialHairColor: null,
                accessoriesType: null,
                topType: null,
                topColor: null,
                trousersType: null,
                shoesType: null,
                loading: false,
                isInit: false
            }
        },
        mounted() {
            if (ModelData) {
                this.initData()
            }
        },
        methods: {
            initData() {
                const {body, clothes, face, header, shoes, accessories, trousers} = ModelData
                this.allData = ModelData
                this.skinColor = body.skin.default
                this.clothesType = clothes.clothesType.default
                this.clothesColor = clothes.clothesColor.default
                this.eyesType = face.eyeType.default
                this.eyebrowType = face.eyebrowType.default
                this.mouthType = face.mouthType.default
                this.facialHairType = face.facialHairType.default
                this.facialHairColor = face.facialHairColor.default
                this.accessoriesType = accessories.accessoriesType.default
                this.topType = header.headerType.default
                this.topColor = header.headerColor.default
                this.trousersType = trousers.trousersType.default
                this.shoesType = shoes.shoesType.default
                this.isInit = true
            },

            updateData(data) {
                const {type, item} = data
                switch (type) {
                    case "skin":
                        this.skinColor = item
                        break
                    case "eyebrow":
                        this.eyebrowType = item
                        break
                    case "eye":
                        this.eyeType = item
                        break
                    case "mouth":
                        this.mouthType = item
                        break
                    case "facialHairType":
                        this.facialHairType = item
                        break
                    case "facialHairColor":
                        this.facialHairColor = item
                        break
                    case "accessories":
                        this.accessoriesType = item
                        break
                    case "headerType":
                        this.topType = item
                        break
                    case "headerColor":
                        this.topColor = item
                        break
                    case "clothesType":
                        this.clothesType = item
                        break
                    case "clothesColor":
                        this.clothesColor = item
                        break
                    case "trousersType":
                        break
                    case "shoesType":
                        break

                }
            },
            createSVG() {
                this.loading = true
                const options = {
                    body_color: this.skinColor.color,
                    face_eye_type: this.eyesType.value,
                    face_eyebrow_type: this.eyebrowType.value,
                    face_mouth_type: this.mouthType.value,
                    face_hair_type: this.facialHairType.value,
                    face_hair_color: this.facialHairColor.value,
                    accessories_type: this.accessoriesType.value,
                    header_type: this.topType.value,
                    header_color: this.topColor.value,
                    clothes_type: this.clothesType.value,
                    clothes_color: this.clothesColor.value,
                    trousers_type: this.trousersType.value,
                    shoes_type: this.shoesType.value
                }
                ModelService.getModel('http://magic-api.21bit.cn/image_svgs', options).then(svgUrl => {
                    this.$router.push(({
                        name: "ModelShow",
                        params: {
                            url: svgUrl
                        }
                    }))
                    this.loading = false
                    this.$message({
                        message: '人物创建成功',
                        type: 'success'
                    })
                })
            },
            pusToTest() {
                this.$router.push({
                    path: "/model/test"
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .model-create
        width 100vw
        height 100vh
        display flex
        align-items center
        justify-content space-between

        .left, .right
            box-sizing border-box
            height 100%
            display flex
            flex-direction column
            align-items center
            justify-content center

        .right
            align-items flex-end
            padding 40px 40px 0 0

            .content
                margin-top 20px
                height 100%
</style>
