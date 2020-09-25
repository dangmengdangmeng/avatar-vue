<template>
    <g id="eyebrow" transform="translate(0.000000, 0.000000)">
        <g v-for="(geo, geoIndex) in selectedEyebrow.geometries" :id="geo.id"
           :key="geo.id + '-eyebrow-geometry-' + geoIndex">
            <path
                    v-if="geo.type == 'path'"
                    :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')'"
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
    import AngryJSON from './EyebrowJSON/Angry.json'

    export default {
        name: 'Eyebrow',
        props: {
            type: {
                type: Object,
                default: {},
            }
        },
        computed: {
            selectedEyebrow() {
                return this.types[this.type.value]
            }
        },
        data() {
            return {
                types: {
                    angry: AngryJSON
                },
            }
        },
    }
</script>
