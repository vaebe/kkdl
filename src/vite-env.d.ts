/// <reference types="vite/client" />
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const zhCn: any
  export default zhCn
}

interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_APP_AXIOS_TIMEOUT: string
  VITE_APP_BASE_URL: string
  VITE_APP_LOGIN_WS_UR: string
  VITE_APP_GITHUB_CLIENT_ID: string
}
