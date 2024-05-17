<script setup lang="ts">
import { useRouter } from 'vue-router'

const { VITE_APP_TITLE } = import.meta.env

const router = useRouter()
function jumpHome() {
  router.push('/')
}
</script>

<template>
  <div class="w-full h-[58px] px-2  shadow">
    <div class="w-full h-full flex  items-center">
      <img src="@/../public/logo.svg" alt="logo" style="width: 38px;height: 38px">
      <h1 class="text-2xl text-black cursor-pointer" @click="jumpHome">
        {{ VITE_APP_TITLE }}
      </h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
