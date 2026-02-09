import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    mkcert(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // 监听所有网络接口
    host: '0.0.0.0',
    proxy: {
      '/identity': {
        // 捕获 /identity 开头的请求，转发到真实认证服务器
        target: 'https://iotserver.dabbsson.cn/manager-identity',
        changeOrigin: true,
        secure: false,
        // 重写路径：去掉 /identity 前缀，直接转发到后端对应的 API 路径
        rewrite: (path) => path.replace(/^\/identity/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 每当有请求触发代理，就在 VS Code 终端打印出来！
            console.log('-------------------------------------------');
            console.log('🕵️‍♂️ 侦探发现请求:', req.url);
            console.log('🚀 正在转发给:', 'https://iotserver.dabbsson.cn/manager-identity' + proxyReq.path);
            console.log('-------------------------------------------');
          });
        }
      },
      // 捕获 /api 开头的请求，转发到业务服务器 (为以后做准备)
      '/api': {
        target: 'https://iotserver.dabbsson.cn/manager/',
        changeOrigin: true,
        //禁用 SSL 证书校验
        secure: false,
      }
    }

  }
})
