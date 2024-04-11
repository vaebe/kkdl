<script setup lang="ts">
const typeList = [
  {
    name: '账号登录',
    type: '0',
  },
  {
    name: '扫码登录',
    type: '1',
  },
]

const curType = defineModel({ default: '0', required: true })
</script>

<template>
  <ul class="login-type-tabs">
    <li
      v-for="(item, index) in typeList" :key="index"
      class="login-type-tabs__item "
      :class="[{ 'login-type-tabs__item-active': item.type === curType }]"
      @click="() => { curType = item.type }"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.login-type-tabs {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--el-bg-color-page);
  border-radius: var(--el-border-radius-base);
  transition: all 0.5s;

  &__item {
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    color: var(--el-text-color-secondary);
    border-radius: var(--el-border-radius-base);
    cursor: pointer;

    span {
      font-size: 18px;
      margin-left: 4px;
    }
  }

  &__item-active {
    color: var(--el-text-color-primary);
    background: var(--el-bg-color);
  }
}
</style>
