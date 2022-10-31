<template>
    <div class="image-container">
        <img v-for="item in fileList" :src="`/uploads/${item}`" :key="item">
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const fileList = ref([])
onMounted(async() => {
    fileList.value = await myApi.getFileList()
})
</script>

<style lang="scss" scoped>
.image-container {
    img {
        width: 100px;
    }
}
</style>
