// src/router/guard.ts
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export function createRouteGuard(router: Router) {
    router.beforeEach((to, from, next) => {
        // 1. 设置标题 (类型安全：因为我们扩展了 RouteMeta，TS 知道 title 是 string)
        const title = to.meta.title ? `${to.meta.title} - IoT Admin` : 'IoT Admin'
        document.title = title
        console.log('导航守卫: 目标路由:', to.fullPath, '来源路由:', from.fullPath)

        // 2. 获取 Store (必须在守卫内部获取，否则 Pinia 可能未初始化)
        const authStore = useAuthStore()

        // 3. 核心守卫逻辑
        if (to.meta.requiresAuth && !authStore.isAuthenticated) {
            // 没登录还想进？滚去登录
            return next({ name: 'Login' })
        } else if (authStore.isAuthenticated && to.name === 'Login') {
            return next({ name: 'Dashboard' })
        }

        next() // 放行
    })
}