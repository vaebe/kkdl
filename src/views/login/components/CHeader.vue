<script setup lang="ts">
import { useRouter } from 'vue-router'

const { VITE_APP_TITLE } = import.meta.env

const router = useRouter()
function jumpHome() {
  router.push('/')
}
</script>

<template>
  <div class="w-full h-[58px] px-2 flex items-center justify-between shadow">
    <h1 class="text-2xl text-black cursor-pointer" @click="jumpHome">
      {{ VITE_APP_TITLE }}
    </h1>
  </div>
</template>

<style scoped lang="scss">
</style>
