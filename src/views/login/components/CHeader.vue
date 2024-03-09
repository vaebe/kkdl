<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const { VITE_APP_TITLE } = import.meta.env;

const ThemeSwitch = defineAsyncComponent(
  () => import('@/components/ThemeSwitch.vue')
);
</script>

<template>
  <div class="login-header">
    <h1 class="title">{{ VITE_APP_TITLE }}</h1>
    <theme-switch></theme-switch>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  padding: 0 10px;

  .title {
    font-size: 28px;
  }
}
</style>
