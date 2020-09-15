<template>
    <svg
            xmlns="http://www.w3.org/2000/svg"
            :width="width"
            :height="height"
            :viewBox="`0 0 ${width} ${height}`"
    >
        <Body :item="skinColor"/>
        <Clothes :type-item="clothesType" :color-item="clothesColor"/>
        <Face
                :eyebrowType="eyebrowType"
                :eyesType="eyesType"
                :mouthType="mouthType"
                :facialHairType="facialHairType"
                :facialHairColor="facialHairColor"
                :topType="topType"
                :topColor="topColor"
        />
        <Accessories :type="accessoriesType"/>
        <Trousers/>
        <Shoes/>
    </svg>
</template>

<script>
    import Body from '../../BodyParts/Body/Body.vue'
    import Clothes from '../../BodyParts/Clothes/Clothes.vue'
    import Face from "../../BodyParts/Face/Face.vue"
    import Accessories from '../../BodyParts/Header/accessories/Accessories.vue'
    import Trousers from "../../BodyParts/Trousers/Trousers.vue"
    import Shoes from "../../BodyParts/Shoes/Shoes.vue"

    export default {
        name: "PreviewModel",
        components: {
            Body,
            Clothes,
            Face,
            Accessories,
            Trousers,
            Shoes
        },
        props: {
            width: {
                type: Number,
                default: 400,
                required: false,
            },
            height: {
                type: Number,
                default: 570,
                required: false,
            },
            skinColor: {
                type: Object,
                default: {}
            },
            clothesType: {
                type: Object,
                default: {}
            },
            clothesColor: {
                type: Object,
                default: {}
            },
            eyebrowType: {
                type: Object,
                default: {}
            },
            eyesType: {
                type: Object,
                default: {}
            },
            mouthType: {
                type: Object,
                default: {}
            },
            facialHairType: {
                type: Object,
                default: {}
            },
            facialHairColor: {
                type: Object,
                default: {}
            },
            topType: {
                type: Object,
                default: {}
            },
            topColor: {
                type: Object,
                default: {}
            },
            accessoriesType: {
                type: Object,
                default: {}
            },
        }
    }
</script>
