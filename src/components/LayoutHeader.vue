<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ThemeSwitch = defineAsyncComponent(() => import('./ThemeSwitch.vue'));

const { VITE_APP_TITLE } = import.meta.env;
</script>

<template>
  <div class="layout-header">
    <h1 class="title mt-2 text-2xl">{{ VITE_APP_TITLE }}</h1>

    <theme-switch></theme-switch>
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
