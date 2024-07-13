<script lang="ts" setup>
import LayoutHeader from '@/views/layout/components/Header.vue'
</script>

<template>
  <div class="base-layout">
    <LayoutHeader />

    <el-scrollbar height="calc(100vh - 58px)">
      <div style="margin: 18px">
        <router-view />
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--el-bg-color-page);
}
</style>
