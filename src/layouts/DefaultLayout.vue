<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation'
import { cn } from '@/lib/utils' // Shadcn 的样式合并工具
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
// 👇 引入图标 (如果没有安装 lucide-vue-next，请运行 npm i lucide-vue-next)
import * as Icons from 'lucide-vue-next'

// 接收 Props
const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['toggle-collapse'])

const route = useRoute()
// 1. 获取菜单数据
const { menuItems } = useNavigation()

// 2. 状态：控制子菜单展开 (默认全部展开，或者根据路由匹配)
// 这里简单起见，使用一个 Set 来存储展开的 path
const expandedKeys = ref<Set<string>>(new Set())

const toggleExpand = (path: string) => {
    if (expandedKeys.value.has(path)) {
        expandedKeys.value.delete(path)
    } else {
        expandedKeys.value.add(path)
    }
}

// 3. 图标动态渲染辅助函数
// 将字符串 'LayoutDashboard' 转换为实际组件
const resolveIcon = (iconName: string) => {
    if (!iconName) return null
    // @ts-ignore
    return Icons[iconName] || Icons.CircleHelp // 找不到就显示问号
}

</script>

<template>
    <aside :class="cn(
        'flex flex-col border-r bg-card transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
    )">

        <div class="h-14 flex items-center justify-center border-b font-bold text-xl cursor-pointer"
            @click="$emit('toggle-collapse')">
            <span v-if="!isCollapsed">IoT Admin</span>
            <span v-else>IoT</span>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-1">
            <template v-for="item in menuItems" :key="item.path">

                <div v-if="item.children && item.children.length > 0">
                    <button @click="toggleExpand(item.path)" :class="cn(
                        'flex items-center w-full p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                        isCollapsed ? 'justify-center' : 'justify-between'
                    )">
                        <div class="flex items-center gap-x-2">
                            <component :is="resolveIcon(item.icon)" class="w-5 h-5" />
                            <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.title }}</span>
                        </div>
                        <Icons.ChevronDown v-if="!isCollapsed"
                            :class="cn('w-4 h-4 transition-transform', expandedKeys.has(item.path) ? 'rotate-180' : '')" />
                    </button>

                    <div v-if="!isCollapsed && expandedKeys.has(item.path)"
                        class="ml-4 mt-1 pl-2 border-l border-border space-y-1">
                        <RouterLink v-for="child in item.children" :key="child.path" :to="child.path" :class="cn(
                            'block p-2 text-sm rounded-md transition-colors hover:bg-muted',
                            route.path === child.path ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                        )">
                            {{ child.title }}
                        </RouterLink>
                    </div>
                </div>

                <RouterLink v-else :to="item.path" :class="cn(
                    'flex items-center gap-x-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                    route.path === item.path ? 'bg-primary text-primary-foreground hover:bg-primary/90' : '',
                    isCollapsed ? 'justify-center' : ''
                )">
                    <component :is="resolveIcon(item.icon)" class="w-5 h-5" />
                    <span v-if="!isCollapsed" class="text-sm font-medium">{{ item.title }}</span>
                </RouterLink>

            </template>
        </nav>
    </aside>
</template>