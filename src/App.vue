<script setup lang="ts">
// 1. 引入组件：注意使用了大括号 {}，因为 Button 是具名导出
import DeviceCard from '@/components/DeviceCard.vue'

</script>

<template>
  <div class="min-h-screen bg-background p-8">

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

      <DeviceCard name="客厅空调" :is-online="true" :temperature="26" />
      <DeviceCard name="大门监控" :is-online="false" :temperature="0" />
      <DeviceCard name="卧室加湿器" :is-online="true" :temperature="45" />

    </div>

  </div>
</template>

<style scoped>
/* 通常在使用 Tailwind 时，我们不需要在这里写额外的 CSS */
</style>