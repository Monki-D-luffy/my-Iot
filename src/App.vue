<script setup lang="ts">
// 1. 引入组件：注意使用了大括号 {}，因为 Button 是具名导出
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center bg-background text-foreground">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-2xl font-bold tracking-tight">IoT 设备管理控制板 📡</h1>

      <Button variant="default" class="">连接设备</Button>

      <Button variant="destructive">断开连接</Button>
    </div>
  </div>
</template>

<style scoped>
/* 通常在使用 Tailwind 时，我们不需要在这里写额外的 CSS */
</style>