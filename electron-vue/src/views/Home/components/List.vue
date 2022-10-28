<template>
    <div>
        <p class="no-items" v-if="!websites.length">暂无数据</p>
        <div class="items">
            <div class="read-item" :class="{'selected': index === activeIndex}" v-for="(item, index) in websites" @click="activeItem(index, item)" :key="item.url">
                <img :src="item.screenshot" alt="" srcset="">
                <h2>{{ item.title }}</h2>
                <button @click.stop="deleteItem(index)"> x </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const emits = defineEmits(['delete'])
defineProps({
    websites: {
        type: Array,
        default: () => []
    }
})

const deleteItem = index => {
    activeIndex.value = -1
    emits('delete',index)
}

const activeIndex = ref(-1)
const activeItem = (index, item) => {
    activeIndex.value = index
    myApi.open(item.url)
    // window.open(item.url, '_blank', 'width=1300, height=800')
}

</script>

<style lang="scss" scoped>
.no-items {
    font-weight: bold;
    color: silver;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 100px;
    z-index: -1;
}
.items {
    .read-item {
        display: flex;
        align-items: center;
        justify-content: start;
        border-bottom: lightgray 2px solid;
        background-color: #fafafa;
        border-left: 10px solid lightgray;
        user-select: none;
        position: relative;
        padding: 10px;
        img {
            width: 20%;
            margin-right: 25px;
            border: 1px solid #ccc;
        }
        &:hover {
            background-color: #eee;
            button {
                display: inline-block;
            }
        }
        &.selected {
            border-left-color: dodgerblue;
        }
        button {
            position: absolute;
            display: none;
            right: 10px;
            top: 10px;
            width: 30px;
            height: 30px;
            background-color: #f44336;
            border: none;
            border-radius: 50%;
            color: white;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
        }
    }
}
</style>
