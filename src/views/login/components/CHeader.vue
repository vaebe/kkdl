<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

const { VITE_APP_TITLE } = import.meta.env

const ThemeSwitch = defineAsyncComponent(
  () => import('@/components/ThemeSwitch.vue'),
)

const router = useRouter()
function jumpHome() {
  router.push('/')
}
</script>

<template>
  <div class="w-full h-[60px] px-2 flex items-center justify-between">
    <h1 class="text-xl cursor-pointer" @click="jumpHome">
      {{ VITE_APP_TITLE }}
    </h1>
    <ThemeSwitch />
  </div>
</template>

<style scoped lang="scss">
</style>
