<template>
    <g id="accessories" transform="translate(38.000000, -10.000000)">
        <g v-for="(geo, geoIndex) in selectedAccessoriesType.geometries" :id="geo.id" :key="geo.id + '-accessories-geometry-' + geoIndex">
            <path
                v-if="geo.type == 'path'"
                :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                :fill="geo.fill ? geo.fill : null"
                :fill-rule="geo.fillRule ? geo.fillRule : null"
                :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                :d="geo.d"
            >
            </path>
            <circle
                v-else-if="geo.type == 'circle'"
                :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                :fill="geo.fill ? geo.fill : null"
                :fill-rule="geo.fillRule ? geo.fillRule : null"
                :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                :cx="geo.cx"
                :cy="geo.cy"
                :r="geo.r"
            >
            </circle>

            <ellipse
                v-else-if="geo.type == 'ellipse'"
                :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                :fill="geo.fill ? geo.fill : null"
                :fill-rule="geo.fillRule ? geo.fillRule : null"
                :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                :cx="geo.cx"
                :cy="geo.cy"
                :rx="geo.rx"
                :ry="geo.ry"
            >
            </ellipse>

            <rect
                v-else-if="geo.type == 'rect'"
                :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                :fill="geo.fill ? geo.fill : null"
                :fill-rule="geo.fillRule ? geo.fillRule : null"
                :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                :x="geo.x"
                :y="geo.y"
                :width="geo.width"
                :height="geo.height"
                :rx="geo.rx"
            >
            </rect>

            <polygon
                v-else-if="geo.type == 'polygon'"
                :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                :fill="geo.fill ? geo.fill : null"
                :fill-rule="geo.fillRule ? geo.fillRule : null"
                :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                :points="geo.points"
            >
            </polygon>
        </g>
    </g>
</template>


<script>
import RoundJSON from './AccessoriesJSON/Round.json'

export default {
    name: 'Accessories',
    props: {
        type: {
            type: Object,
            default: {},
        }
    },
    computed: {
        selectedAccessoriesType() {
            return this.types[this.type.value]
        }
    },
    data() {
        return {
            types: {
                round: RoundJSON,
            }
        }
    },
}
</script>
