<script lang="ts" setup>
import { Moon, Sunny } from '@element-plus/icons-vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

function themeChange() {
  toggleDark()
}
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
