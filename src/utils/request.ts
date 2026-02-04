// src/utils/request.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth'

// 1. 定义后端统一返回格式 (根据实际后端接口调整)
export interface ApiResponse<T = any> {
    code: number
    data: T
    msg: string
}

class Request {
    private instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.setupInterceptors()
    }

    private setupInterceptors() {
        // A. 请求拦截器：自动注入 Token
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const authStore = useAuthStore()
                if (authStore.token) {
                    // ⚠️ 注意：这里必须符合后端要求的 Header 格式，通常是 'Bearer ' + token
                    config.headers.Authorization = `Bearer ${authStore.token}`
                }
                return config
            },
            (err) => Promise.reject(err)
        )

        // B. 响应拦截器：全局错误处理
        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // 这里的 response.data 是后端返回的完整 JSON
                // 你可以根据 code 判断是否成功，例如 code === 200
                return response.data
            },
            (err) => {
                // 401 处理：Token 失效自动登出
                if (err.response?.status === 401) {
                    const authStore = useAuthStore()
                    authStore.logout()
                    // 可选：强制刷新页面以重置所有状态
                    // location.reload() 
                }
                // 这里可以集成 Shadcn 的 Toast 提示错误信息
                console.error('API Error:', err.response?.data?.msg || err.message)
                return Promise.reject(err)
            }
        )
    }

    // C. 泛型方法封装
    // T 是业务层期望拿到的数据类型 (User, DeviceList 等)
    // R 默认包裹 ApiResponse，保证类型链条完整
    get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.instance.get(url, config)
    }

    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        return this.instance.post(url, data, config)
    }

    // delete, put 同理...
}

// 导出单例
export default new Request({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
})