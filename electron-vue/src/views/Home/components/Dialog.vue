<template>
    <div class="dialog-wrap">
        <div class="content">
            <div class="input">
                <input v-model="url" type="text" placeholder="请输入网址" @keyup.enter="add">
            </div>
            <div class="btns">
                <button @click="add">添加</button>
                <button @click="close">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, toRefs, watch } from 'vue'
const props = defineProps({
    websites: {
        type: Array,
        default: () => []
    },
    dialogVisible: {
        type: Boolean,
        default: false
    }
})
const { websites, dialogVisible } = toRefs(props)
const emit = defineEmits(['close', 'add'])
const url = ref('')
const close = () => {
    emit('close')
}
const add = async () => {
    const item = websites.value.find(item => item.url === url.value)
    if (item) {
        myApi.alert('该网址已添加')
        return
    }
    const res = await myApi.sendUrl(url.value)
    if (!res.screenshot) {
        myApi.alert(res.msg)
        return
    }
    emit('add', res)
}
watch(dialogVisible, val => {
    if (!val) {
        url.value = ''
    }
})
</script>

<style lang="scss" scoped>
.dialog-wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    .content {
        width: 100%;
        padding: 0 20px;
        input {
            height: 30px;
            width: 100%;
            outline: none;
            margin-bottom: 10px;
            font-size: 12px;
        }
        btns {
            button {
                height: 30px;
                margin-right: 10px;
                font-size: 12px;
                padding: 0 20px;
            }
        }
    }
}
</style>
