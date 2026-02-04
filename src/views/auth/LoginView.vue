<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = () => {
    console.log('登录测试');

    // 1. 调用 store 的登录动作
    authStore.login('123456')
    // 2. 跳转回首页
    router.push('/')
}
</script>

<template>
    <div class="flex h-screen justify-center items-center bg-gray-100">
        <div class="p-8 bg-white rounded-lg shadow-md text-center">
            <h1 class="text-2xl font-bold mb-4">请先登录 🔐</h1>
            <button @click="handleLogin" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                点击模拟登录
            </button>
        </div>
    </div>
</template>