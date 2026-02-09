// 伪代码提示
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { RouteRecordRaw } from 'vue-router'

// 这里的 NavItem 就是为了给侧边栏组件用的纯净数据
export interface NavItem {
    title: string
    path: string
    icon?: string
    children?: NavItem[] // 支持多级菜单
    active?: boolean     // 是否高亮
}

export function useNavigation() {
    const router = useRouter()
    const authStore = useAuthStore()

    // 核心递归函数：把 RouteRecordRaw 转成 NavItem
    const transformRoutes = (routes: readonly RouteRecordRaw[]): NavItem[] => {
        const list: NavItem[] = []

        routes.forEach(route => {
            // 1. 过滤：如果 meta.hidden 为 true，直接跳过 (return)
            if (route.meta?.hidden || !authStore.userInfo) return

            // 2. 权限过滤：检查 route.meta.roles 是否包含 authStore.userInfo.role
            if (route.meta?.roles && !route.meta.roles.includes(authStore.userInfo.role)) {
                return
            }

            // 3. 构建 item 对象
            const item: NavItem = {
                title: (route.meta?.title as string) || '未命名',
                path: route.path,
                icon: route.meta?.icon as string,
            }

            // 4. 递归处理 children (如果有子路由)
            if (route.children) {
                item.children = transformRoutes(route.children) // 递归调用自己
            }

            list.push(item)
        })

        return list
    }

    const menuItems = computed(() => {
        // router.options.routes 包含了你在 router/index.ts 里定义的所有路由
        return transformRoutes(router.options.routes)
    })

    return { menuItems }
}