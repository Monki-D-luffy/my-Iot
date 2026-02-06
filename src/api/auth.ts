import request from '@/utils/request'

// 1. 定义参数类型
export interface LoginRequest {
    userName: string;
    password: string;
    productName?: string;
}

// 2. 定义返回结果类型 (根据真实后端返回)
export interface LoginResult {
    accessToken: string;
    refreshToken: string;
    // ... 其他字段
}

// 3. 导出登录函数
export const loginApi = (data: LoginRequest) => {
    // 这里的 '/identity' 对应 vite.config.ts 里的代理前缀
    return request.post<LoginResult>('/identity/api/Login/LoginByPwd', data)
}