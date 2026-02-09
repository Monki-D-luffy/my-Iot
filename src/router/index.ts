import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 1. 定义路由数组
// 使用 RouteRecordRaw 类型，TS 会自动检查你的配置是否符合规范
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        // 还没写页面？没关系，先留个占位或者指向一个空文件，重点是下面的 meta
        component: () => import('@/views/auth/LoginView.vue'),
        meta: {
            title: '登录',
            requiresAuth: false,
        },
    },

    {
        path: '/layout',
        name: 'Layout',
        children: [
            {
                path: '/overview',
                name: 'Overview',
                component: () => import('@/views/dashboard/Overview.vue'),
                meta: {
                    title: '概览',
                    requiresAuth: true,
                    icon: 'LayoutDashboard', // 这个 icon 名字要和你在组件库里注册的名字一致
                    // 这里的 roles 是可选的，写了就必须是 string[]
                    roles: ['admin', 'engineer'],
                }
            }
        ],
        component: () => import('@/layouts/DefaultLayout.vue'),
        meta: {
            title: '侧边栏布局',
            requiresAuth: true,
        },
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue'),
        meta: {
            title: '页面未找到',
            requiresAuth: false,
        },
    },

]

// 2. 创建路由实例
const router = createRouter({
    // import.meta.env.BASE_URL 读取 vite.config.ts 中的 base 配置，默认为 '/'
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// 3. 导出路由，供 main.ts 挂载
export default router