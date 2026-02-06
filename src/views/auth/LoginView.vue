<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 定义表单数据
const form = reactive({
    account: '2891608692@qq.com',
    password: ''
})
const loading = ref(false)

const handleLogin = async () => {
    if (!form.account || !form.password) {
        alert('请输入账号和密码')
        return
    }

    loading.value = true
    // 调用 Store 的真实登录动作
    const success = await authStore.login(form.account, form.password)
    loading.value = false

    if (success) {
        console.log('登录成功,跳转页面');

        // 登录成功，跳转首页
        router.push('/dashboard')
    } else {
        alert('登录失败，请检查账号密码')
    }
}
</script>

<template>
    <div class="flex h-screen justify-center items-center bg-gray-100">
        <div class="p-8 bg-white rounded-lg shadow-md w-96">
            <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">IoT 系统登录</h1>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">账号</label>
                    <input v-model="form.account" type="text"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="请输入账号" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                    <input v-model="form.password" type="password"
                        class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="请输入密码" />
                </div>

                <button @click="handleLogin" :disabled="loading"
                    class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400">
                    {{ loading ? '登录中...' : '登 录' }}
                </button>
            </div>
        </div>
    </div>
</template>