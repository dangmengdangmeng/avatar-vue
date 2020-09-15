<template>
    <g id="face" transform="translate(40.000000, -10.000000)">
        <Eyes :type="eyesType"/>
        <Eyebrow :type="eyebrowType"/>
        <Nose/>
        <Mouth :type="mouthType"/>
        <Hair :type="topType" :color="topColor"/>
        <!-- <FacialHair :type="facialHairType" :color="facialHairColor" /> -->
    </g>
</template>
<script>
    import Eyebrow from './eyebrow/Eyebrow.vue'
    import Eyes from './eyes/Eyes.vue'
    import Nose from './nose/Nose.vue'
    import Mouth from './mouth/Mouth.vue'
    // import FacialHair from '../Header/facialHair/FacialHair.vue'
    import Hair from '../Header/hair/Hair.vue'

    export default {
        name: 'Face',
        components: {
            Eyebrow,
            Eyes,
            Nose,
            Mouth,
            // FacialHair,
            Hair,
        },
        props: {
            eyebrowType: {
                type: Object,
                default: {},
            },
            eyesType: {
                type: Object,
                default: {},
            },
            mouthType: {
                type: Object,
                default: {},
            },
            facialHairType: {
                type: Object,
                default: {},
            },
            facialHairColor: {
                type: Object,
                default: {},
            },
            topType: {
                type: Object,
                default: {},
            },
            topColor: {
                type: Object,
                default: {},
            }
        },
        data() {
            return {}
        }
    }
</script>
