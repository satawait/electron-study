<template>
    <div class="search-container">
        <div class="button" @click="addClick">+</div>
        <div class="input">
            <input v-model.lazy="keyword" type="text" placeholder="请输入关键字...">
        </div>
    </div>
</template>

<script setup>
import { defineEmits, watch, ref } from "vue";
const emit = defineEmits(['addClick', 'search'])
const keyword = ref('')
const addClick = () => {
    emit('addClick')
}
watch(keyword, val => {
    emit('search', val)
})
</script>

<style scoped lang="scss">
.search-container {
    height: 60px;
    background-color: #d3d3d3;
    display: flex;
    align-items: center;
    justify-content: center;
    .button {
        width: 40px;
        height: 40px;
        background-color: #1e90ff;
        padding-left: 0;
        border-radius: 5px;
        font-size: 30px;;
        font-weight: bold;
        color: #fff;
        text-align: center;
        cursor: default;
    }
    .input {
        flex: 1;
        height: 36px;
        padding: 0 10px;
        input {
            height: 100%;
            width: 100%;
            border: solid 1px #ccc;
            border-radius: 5px;
            padding: 0 10px;
            outline: none;
        }
    }
}
</style>
