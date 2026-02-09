// src/composables/useNavigation.ts
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // 👈 注意引用路径
import type { RouteRecordRaw } from 'vue-router'

export interface NavItem {
    title: string
    path: string
    icon?: any // 暂时用 any，因为 component 类型比较复杂
    children?: NavItem[]
}

export function useNavigation() {
    const router = useRouter()
    const authStore = useAuthStore()

    const transformRoutes = (routes: readonly RouteRecordRaw[], parentPath = ''): NavItem[] => {
        const list: NavItem[] = []

        routes.forEach(route => {
            // 1. 隐藏 & 权限过滤
            if (route.meta?.hidden) {
                console.log('hidden', route.meta?.hidden);

                return
            }
            if (route.meta?.roles && !authStore.userInfo) {
                console.log('roles=', route.meta?.roles, 'userInfo=', authStore.userInfo);
                return
            }

            // ⚠️ 权限判定核心修复：大小写不敏感
            const routeRoles = route.meta?.roles as string[] | undefined
            const userRole = authStore.userInfo?.role.toLowerCase()

            if (routeRoles && userRole) {
                const hasPermission = routeRoles.some(r => r.toLowerCase() === userRole)
                if (!hasPermission) return
            }

            // 2. 路径拼接修复 (防止 //dashboard)
            const fullPath = route.path.startsWith('/')
                ? route.path
                : `${parentPath === '/' ? '' : parentPath}/${route.path}`

            const item: NavItem = {
                title: (route.meta?.title as string) || 'Untitled',
                path: fullPath,
                icon: route.meta?.icon,
            }

            if (route.children) {
                item.children = transformRoutes(route.children, fullPath)
            }

            list.push(item)
        })

        return list
    }

    const menuItems = computed(() => {

        // 过滤掉 layout 这一层，直接取它的 children
        const layoutRoute = router.options.routes.find(r => r.path === '/layout')
        return layoutRoute ? transformRoutes(layoutRoute.children || [], '') : []
    })

    return { menuItems }
}