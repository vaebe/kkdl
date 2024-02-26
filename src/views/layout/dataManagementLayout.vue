<script lang="ts" setup>
import LayoutMenu from '@/views/layout/components/LayoutMenu.vue';
</script>

<template>
  <div class="dm-layout">
    <layout-menu></layout-menu>
    <div class="dm-layout__content-box">
      <el-scrollbar height="calc(100vh - 58px)">
        <div style="margin: 18px">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dm-layout {
  display: flex;

  &__content-box {
    box-sizing: border-box;
    width: calc(100vw - 240px);
    height: calc(100vh - 58px);
  }
}
</style>
