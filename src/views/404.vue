<template>
    <div class="flex flex-col h-screen justify-center items-center bg-gray-100">
        <h1 class="text-9xl font-bold text-gray-300">404</h1>
        <p class="text-2xl text-gray-600 mt-4">页面好像去火星了 🚀</p>
        <button v-on:click="handleNotFound" class="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            带我回家
        </button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleNotFound = () => {
    console.log('回到登录页面');

    authStore.logout()
    router.push('/')
}

</script>