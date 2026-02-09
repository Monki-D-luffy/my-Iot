import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginApi } from '@/api/auth' // 👈 引入刚才写的 API
import type { LoginResult } from '@/api/auth' // 👈 引入 LoginResult 类型定义


export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'))
    const storedUser = localStorage.getItem('userInfo')
    const userInfo = ref<LoginResult | null>(storedUser ? JSON.parse(storedUser) : null)
    const isAuthenticated = computed(() => !!token.value)

    // 👇 改造 login 为异步函数
    async function login(username: string, password: string) {
        try {
            console.log('正在请求登录接口...')

            // 1. 发起真实请求
            // 注意：这里硬编码了 productName，这是您后端要求的
            const res = await loginApi({
                userName: username,
                password: password,
                productName: 'ManagerIdentity'
            })

            // 2. 解析 Token 
            const accessToken = res.data.accessToken

            if (accessToken) {
                token.value = accessToken
                userInfo.value = res.data
                localStorage.setItem('token', accessToken)
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                console.log('登录成功! Token:', accessToken)
                return true
            } else {
                console.error('登录失败: 未找到 Token', res)
                return false
            }
        } catch (error) {
            console.error('登录请求出错:', error)
            return false
        }
    }

    function logout() {
        token.value = null
        localStorage.removeItem('token')
        console.log('已退出登录')
    }

    return { token, isAuthenticated, userInfo, login, logout }
})