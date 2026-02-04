/// <reference types="vite/client" />

// 1. 环境变量接口定义
// 这里的 readonly 是为了防止你在代码里手滑修改环境变量（比如 import.meta.env.VITE_API = '...'，这是不允许的）
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_TITLE: string;
    // 以后如果有 VITE_TIMEOUT 就在这里追加，不要瞎猜
}

// 修改全局的 ImportMeta(官方) 接口，告诉 TS 我们的环境变量类型
interface ImportMeta {
    // 只修改env属性的类型,将我们自定义的 ImportMetaEnv 接口赋给它
    readonly env: ImportMetaEnv;
}

// 2. 路由元信息接口扩展 (这才是重头戏)
// 我们必须显式导入 vue-router，确保这是一个模块文件
import 'vue-router'

// 给 vue-router 的 RouteMeta 接口添加我们自己的字段，这样在使用时就有类型提示了
declare module 'vue-router' {
    // 这里扩展的 RouteMeta 会自动合并到 vue-router 原始的空接口中
    interface RouteMeta {
        /** 页面标题 (用于面包屑/Tab/document.title) */
        title: string;
        /** 是否需要登录 (true: 必须登录, false: 公开页面) */
        requiresAuth: boolean;
        /** 允许访问的角色 (可选，不传代表所有角色可用) */
        roles?: string[];
    }
}