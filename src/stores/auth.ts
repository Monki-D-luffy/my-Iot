// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
    // 定义你的 User 结构
    id: number
    name: string
    loginState: boolean
}

export const useAuthStore = defineStore('auth', () => {
    // 1. State: 初始化时尝试从 localStorage 拿 token
    const token = ref<string | null>(localStorage.getItem('token'))
    const user = ref<User | null>(null)

    // 2. Getters
    const isAuthenticated = computed(() => !!token.value)
    console.log('登录中...')
    // 3. Actions
    function login(newToken: string) {
        // 更新 token, 写入 localStorage
        token.value = newToken
        localStorage.setItem('token', newToken)
        console.log('登录成功, Token:', newToken)
    }

    function logout() {
        // 清理 token, 清理 localStorage
        token.value = null
        localStorage.removeItem('token')
        user.value = null
        console.log('已退出登录')
    }

    return { token, user, isAuthenticated, login, logout }
})