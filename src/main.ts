import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

// 👇 1. 引入路由实例 (必须)
import router from './router'
// 👇 2. 引入你写的守卫工厂函数 (必须)
import { createRouteGuard } from './router/guard'

const app = createApp(App)

app.use(createPinia())
// 👇 3. 挂载路由 (必须先挂载 router，再启动守卫)
app.use(router)

// 👇 4. ⚡️ 关键一步：启动守卫！⚡️
// 如果不写这一行，你的 guard.ts 就是废纸。
createRouteGuard(router)

app.mount('#app')