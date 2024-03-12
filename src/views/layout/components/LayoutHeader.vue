<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const ThemeSwitch = defineAsyncComponent(
  () => import('@/components/ThemeSwitch.vue'),
)

const { VITE_APP_TITLE } = import.meta.env

const userStore = useUserStore()
const { userInfo, isLogin } = storeToRefs(userStore)
const { loginOut } = userStore

const router = useRouter()
// 跳转
function jumpPage(path: string) {
  router.push(`/${path}`)
}
</script>

<template>
  <div class="layout-header">
    <h1 class="title mt-2 text-2xl">
      {{ VITE_APP_TITLE }}
    </h1>

    <!--  用户登录后才需要展示菜单切换  -->
    <ul v-if="isLogin" class="menu grid grid-cols-2 gap-2">
      <li
        class="cursor-pointer hover:text-blue-500" :class="[
          { 'text-blue-600': $route.path.startsWith('/url') },
        ]"
        @click="jumpPage('url')"
      >
        创建短链
      </li>
      <li
        class="cursor-pointer hover:text-blue-500" :class="[
          { 'text-blue-600': $route.path.startsWith('/dm') },
        ]"
        @click="jumpPage('dm')"
      >
        数据管理
      </li>
    </ul>

    <div class="flex justify-end items-center">
      <el-popover v-if="isLogin" placement="bottom" trigger="click">
        <template #reference>
          <p class="cursor-pointer hover:text-blue-500">
            {{ userInfo.nickName }}
          </p>
        </template>
        <ul class="text-center space-y-2">
          <li class="cursor-pointer hover:text-blue-400" @click="loginOut">
            退出登录
          </li>
          <li class="cursor-pointer hover:text-blue-400">
            版本：1.0.0
          </li>
        </ul>
      </el-popover>

      <p v-else class="cursor-pointer">
        <span class="hover:text-blue-500" @click="jumpPage('login')">登录</span>
        ｜
        <span class="hover:text-blue-500" @click="jumpPage('register')">
          注册
        </span>
      </p>
      <ThemeSwitch class="ml-2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 58px;
  padding: 0 1vw;
  border-bottom: 1px solid var(--el-border-color);

  .title {
    display: inline-block;
    color: transparent;
    background: linear-gradient(90deg, #fd9248, #fa1768);
    background-clip: text;
  }
}
</style>
