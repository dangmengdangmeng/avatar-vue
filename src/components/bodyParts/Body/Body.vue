<template>
    <g id="body" transform="translate(32.000000, 0.000000)">
        <path
                :d="body.d"
                :fill="item.color"
        ></path>
    </g>
</template>


<script>
    import bodyJSON from './Body.json'

    export default {
        name: 'Body',
        props: {
            item: {},
        },
        data() {
            return {
                body: bodyJSON.body
            }
        },
    }
</script>
