<script lang="ts" setup>
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const themeChange = () => {
  toggleDark();
};
</script>

<template>
  <el-button
    :icon="isDark ? Moon : Sunny"
    round
    size="small"
    @click="themeChange"
  />
</template>

<style lang="scss" scoped></style>
