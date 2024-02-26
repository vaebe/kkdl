<script lang="ts" setup>
import LayoutHeader from '@/views/layout/components/LayoutHeader.vue';
</script>

<template>
  <div class="base-layout">
    <layout-header></layout-header>
    <div class="base-layout__content-box">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  background: var(--el-bg-color-overlay);

  &__content-box {
    width: 100vw;
    height: calc(100vh - 58px);
  }
}
</style>
