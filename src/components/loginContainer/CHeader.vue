<script setup lang="ts">
import { Icon } from '@iconify/vue'

const { VITE_APP_TITLE } = import.meta.env

const router = useRouter()
function jumpHome() {
  router.push('/')
}
</script>

<template>
  <div class="w-full h-14.5 px-4 shadow flex items-center justify-between">
    <div class="w-full h-full flex items-center">
      <img src="/logo.svg" alt="logo" style="width: 32px;height: 32px">
      <h1 class="text-2xl text-black cursor-pointer ml-2" @click="jumpHome">
        {{ VITE_APP_TITLE }}
      </h1>
    </div>

    <router-link to="/analytics">
      <Icon icon="tabler:chart-pie" class="cursor-pointer hover:text-blue-400" width="30px" height="30px" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
</style>
