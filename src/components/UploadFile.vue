<template>
    <div class="upload-file">
        <input type="file" @change="getFile($event)">
    </div>
</template>

<script>
    export default {
        name: "UploadFile",
        methods: {
            getFile(e) {
                const file = e.target.files[0]
                this.$emit('file', URL.createObjectURL(file))
            }
        }
    }
</script>
