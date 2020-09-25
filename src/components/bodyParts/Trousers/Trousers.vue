<template>
    <g id="pants" transform="translate(39.000000, -6.000000)">
        <g v-for="(geo, geoIndex) in selectedClothes.geometries" :id="geo.id" :key="geo.id + '-clothes-geometry-' + geoIndex">
            <path v-if="geo.type == 'path'"
            :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
            :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
            :fill="geo.fill ? geo.fill : colors[color]"
            :fill-rule="geo.fillRule ? geo.fillRule : null"
            :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
            :d="geo.d"
            ></path>
        </g>
    </g>
</template>
<script>
import casualPantsJSON from "./TrousersJSON/casualPants.json"
export default {
    data(){
        return{
            types: {
                casualPants: casualPantsJSON
            },
            colors: {
                black: '#262E33'
            },
        }
    },
    computed: {
        selectedClothes() {
            return this.types[this.type]
        }
    },
    props: {
        type: {
            type: String,
            default: 'casualPants',
            required: false,
        }
    },
}
</script>
<style scoped>

</style>