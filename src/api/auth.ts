import request from '@/utils/request'

// 所有的接口响应都会套用这个壳
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    success: boolean;
    data: T; // 这里的 T 就是具体的业务数据
}

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
    userId: string;
    account: string;
    nickname: string;
    role: 'Admin' | 'User' | string; // 优先使用联合类型，增加代码提示
    accessExpired: number;
    refreshExpired: number;
    // ... 其他字段如 email, isEnabled 等按需添加
}

// 3. 导出登录函数
export const loginApi = (data: LoginRequest) => {
    // 这里的 '/identity' 对应 vite.config.ts 里的代理前缀
    return request.post<LoginResult>('/identity/api/Login/LoginByPwd', data)
}