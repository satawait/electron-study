<template>
    <main>
        <search-bar
            @addClick="addClick"
            @search="search" />
            <teleport to="body">
                <dialog-view
                    :websites="websites"
                    :dialogVisible="dialogVisible"
                    @close="close"
                    @add="add"
                    v-show="dialogVisible" />
            </teleport>
        <list-view :websites="localWebsites" @delete="deleteItem" />
    </main>
</template>

<script setup>
import SearchBar from "./components/SearchBar";
import DialogView from "./components/Dialog";
import ListView from "./components/List";
import { ref, onMounted, watch } from "vue";
const dialogVisible = ref(false)
const websites = ref([])
const localWebsites = ref([])
const keyword = ref('')
watch([websites, keyword], ([websites, keyword]) => {
    if (!keyword) {
        localWebsites.value = websites
    } else {
        localWebsites.value = websites.filter(item => item.title.includes(keyword) || item.url.includes(keyword))
    }
})
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
const search = val => {
    keyword.value = val
}
onMounted(() => {
    websites.value = JSON.parse(localStorage.getItem('websites') || '[]')
})
</script>

<style scoped>

</style>
