import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: '/',
    alias: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue')
},
{
    path: '/imageGallery',
    name: 'ImageGallery',
    component: () => import('@/views/ImageGallery/index.vue')
}]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
