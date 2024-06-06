<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores'

const { VITE_APP_TITLE } = import.meta.env

const { isLogin } = storeToRefs(useUserStore())

const router = useRouter()
function jumpHome() {
  router.push(isLogin.value ? '/shortUrl' : '/')
}
</script>

<template>
  <div class="relative z-10 w-full h-[58px] px-20 flex items-center justify-between bg-white shadow">
    <div class="w-1/2 h-full flex  items-center">
      <img src="@/../public/logo.svg" alt="logo" style="width: 32px;height: 32px">
      <h1 class="text-2xl text-black cursor-pointer ml-2" @click="jumpHome">
        {{ VITE_APP_TITLE }}
      </h1>
    </div>

    <!--  登录  -->
    <div v-if="isLogin" class="w-1/2 flex items-center justify-end cursor-pointer">
      <router-link to="/shortUrl">
        <p class="px-6 py-0.5 bg-black border-4 border-white hover:border-4 hover:border-gray-200 text-white rounded-3xl ">
          短链管理
        </p>
      </router-link>
    </div>

    <!--  未登录  -->
    <div v-else class="w-1/2 flex items-center justify-end cursor-pointer">
      <router-link to="/register">
        <p class="mr-4 text-gray-500 hover:text-black">
          注册
        </p>
      </router-link>
      <router-link to="/login">
        <p class="px-6 py-0.5 bg-black border-4 border-white hover:border-4 hover:border-gray-200 text-white rounded-3xl ">
          登录
        </p>
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
