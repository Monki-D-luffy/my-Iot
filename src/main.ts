import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'

import router from './router'
import { createRouteGuard } from './router/guard'

const app = createApp(App)

app.use(createPinia())
// 挂载路由 (必须先挂载 router，再启动守卫)
app.use(router)

// 启动守卫！
createRouteGuard(router)

app.mount('#app')