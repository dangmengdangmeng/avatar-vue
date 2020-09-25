<template>
    <g id="clothes" transform="translate(40.000000, -5.000000)">
        <g v-for="(geo, geoIndex) in selectedClothes.geometries" :id="geo.id"
           :key="geo.id + '-clothes-geometry-' + geoIndex">
            <path v-if="geo.type === 'path'"
                  :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                  :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                  :fill="geo.fill ? geo.fill : colorItem.value"
                  :fill-rule="geo.fillRule || null"
                  :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                  :d="geo.d"
            ></path>
            <circle v-else-if="geo.type === 'circle'"
                    :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                    :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                    :fill="geo.fill ? geo.fill : colorItem.value"
                    :fill-rule="geo.fillRule || null"
                    :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                    :cx="geo.cx"
                    :cy="geo.cy"
                    :r="geo.r"
            ></circle>
            <ellipse v-else-if="geo.type === 'ellipse'"
                     :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                     :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                     :fill="geo.fill ? geo.fill : null"
                     :fill-rule="geo.fillRule || null"
                     :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                     :cx="geo.cx"
                     :cy="geo.cy"
                     :rx="geo.rx"
                     :ry="geo.ry"
            ></ellipse>
            <rect v-else-if="geo.type === 'rect'"
                  :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                  :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                  :fill="geo.fill ? geo.fill : colorItem.value"
                  :fill-rule="geo.fillRule || null"
                  :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                  :x="geo.x"
                  :y="geo.y"
                  :width="geo.width"
                  :height="geo.height"
                  :rx="geo.rx"
            ></rect>
            <polygon v-else-if="geo.type === 'polygon'"
                     :transform="'translate(' + geo.offset.x + ', ' + geo.offset.y + ')' + (geo.scale ? ' scale(' + geo.scale.x + ', ' + geo.scale.y + ')' : '') + (geo.rotate ? 'rotate(' + geo.rotate  + ')' : '')"
                     :fill-opacity="geo.fillOpacity ? geo.fillOpacity : null"
                     :fill="geo.fill ? geo.fill : colorItem.value"
                     :fill-rule="geo.fillRule || null"
                     :mask="geo.mask ? 'url(#' + geo.mask + ')' : null"
                     :points="geo.points"
            ></polygon>
        </g>
    </g>
</template>


<script>
    import HoodieJSON from './ClothesJSON/Hoodie.json'

    export default {
        name: 'Clothes',
        props: {
            typeItem: {
                type: Object,
                default: {}
            },
            colorItem: {
                type: Object,
                default: {}
            }
        },
        computed: {
            selectedClothes() {
                return this.types[this.typeItem.value] || {}
            }
        },
        data() {
            return {
                types: {
                    hoodie: HoodieJSON,
                }
            }
        },
    }
</script>
