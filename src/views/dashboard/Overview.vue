<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Activity, Users, CreditCard, DollarSign } from 'lucide-vue-next'
debugger
</script>

<template>
    <div class="p-8 space-y-8 bg-slate-50 min-h-full">

        <div class="flex items-center justify-between space-y-2">
            <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">最后更新: 刚刚</span>
            </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">总收入</CardTitle>
                    <DollarSign class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">$45,231.89</div>
                    <p class="text-xs text-muted-foreground">+20.1% 较上月</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">活跃用户</CardTitle>
                    <Users class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">+2350</div>
                    <p class="text-xs text-muted-foreground">+180.1% 较上月</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">设备在线</CardTitle>
                    <Activity class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">+12,234</div>
                    <p class="text-xs text-muted-foreground">+19% 较上小时</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">报警总数</CardTitle>
                    <CreditCard class="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">+573</div>
                    <p class="text-xs text-muted-foreground">+201 自上次登录</p>
                </CardContent>
            </Card>

        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4">
                <CardHeader>
                    <CardTitle>近期概览</CardTitle>
                </CardHeader>
                <CardContent class="pl-2">
                    <div
                        class="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                        图表区域占位符
                    </div>
                </CardContent>
            </Card>

            <Card class="col-span-3">
                <CardHeader>
                    <CardTitle>最近动态</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="space-y-8">
                        <div class="flex items-center">
                            <span
                                class="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200"></span>
                            <div class="ml-4 space-y-1">
                                <p class="text-sm font-medium leading-none">设备 A001 上线</p>
                                <p class="text-sm text-muted-foreground">user@example.com</p>
                            </div>
                            <div class="ml-auto font-medium text-green-600">在线</div>
                        </div>
                        <div class="flex items-center">
                            <span
                                class="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200"></span>
                            <div class="ml-4 space-y-1">
                                <p class="text-sm font-medium leading-none">固件升级失败</p>
                                <p class="text-sm text-muted-foreground">v1.0.2 -> v1.0.3</p>
                            </div>
                            <div class="ml-auto font-medium text-red-600">失败</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    </div>
</template>