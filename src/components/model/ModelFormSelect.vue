<template>
    <div class="model-form-item" v-if="defaultValue && options">
        <div class="name">{{name}}</div>
        <el-select v-model="defaultValue" placeholder="请选择" @change="changeValue">
            <el-option
                    v-for="item in options.options"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        name: "ModelFormItem",
        props: {
            name: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ""
            },
            options: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                defaultValue: null
            }
        },
        mounted() {
            this.defaultValue = JSON.parse(JSON.stringify(this.options.default)).value
        },
        methods: {
            changeValue(data) {
                const {options} = this.options
                const curItem = options.find(item => item.value === data)
                this.$emit('selected-item', {
                    type: this.type,
                    item: curItem
                })
            }
        }
    }
</script>
