<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// 定义这个组件接收的数据（Props）
defineProps<{
    name: string
    isOnline: boolean
    temperature: number
}>()
</script>

<template>
    <Card class="w-full bg-amber-100">
        <CardHeader>
            <div class="flex items-center justify-between">
                <CardTitle>{{ name }}</CardTitle>

                <span class="relative flex h-3 w-3 rounded-full" :class="isOnline ? 'bg-green-500' : 'bg-red-500'">
                    <span v-if="isOnline"
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                </span>

            </div>
            <CardDescription>状态: {{ isOnline ? '正常运行' : '设备离线' }}</CardDescription>
        </CardHeader>

        <CardContent>
            <div class="flex items-baseline gap-2">
                <span class="text-5xl font-bold tracking-tighter">
                    {{ temperature }}
                </span>
                <span class="text-sm font-medium text-muted-foreground">°C</span>
            </div>
        </CardContent>

        <CardFooter>
            <Button class="w-full" :variant="isOnline ? 'outline' : 'destructive'">
                {{ isOnline ? '查看历史数据' : '重新连接' }}
            </Button>
        </CardFooter>
    </Card>
</template>