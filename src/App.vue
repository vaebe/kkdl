<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
import { useDark } from '@vueuse/core'

// 设置系统名称
const { VITE_APP_TITLE } = import.meta.env
document.title = VITE_APP_TITLE

useDark()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
