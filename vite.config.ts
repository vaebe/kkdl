import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        {
          from: 'vue-router',
          imports: ['RouteLocationRaw', 'RouteLocationNormalized', 'RouteRecordRaw', 'RouteLocation'],
          type: true,
        },
      ],
      dirs: [
        './src/composables',
        './src/stores/modules',
      ],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    compression(),
    visualizer(),
    vueDevTools(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framework': ['vue', 'vue-router', '@vueuse/core'],
          'lodash-es': ['lodash-es'],
        },
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
})
