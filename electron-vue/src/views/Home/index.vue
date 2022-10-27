<template>
    <main>
        <search-bar
            @addClick="addClick" />
        <dialog-view
            :websites="websites"
            @close="close"
            @add="add"
            v-show="dialogVisible" />
        <list-view :websites="websites" @delete="deleteItem" />
    </main>
</template>

<script setup>
import SearchBar from "./components/SearchBar";
import DialogView from "./components/Dialog";
import ListView from "./components/List";
import { ref, onMounted } from "vue";
const dialogVisible = ref(false)
const websites = ref([])
const addClick = () => {
    dialogVisible.value = true
}
const close = () => {
    dialogVisible.value = false
}
const add = (res) => {
    dialogVisible.value = false
    websites.value.unshift(res)
    localStorage.setItem('websites', JSON.stringify(websites.value || []))
}
const deleteItem = index => {
    websites.value.splice(index, 1)
    localStorage.setItem('websites', JSON.stringify(websites.value || []))
}
onMounted(() => {
    websites.value = JSON.parse(localStorage.getItem('websites') || '[]')
})
</script>

<style scoped>

</style>
