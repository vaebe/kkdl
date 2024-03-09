<script setup lang="ts">
const { VITE_APP_TITLE } = import.meta.env;
</script>

<template>
  <div class="login-header">
    <h1 class="title">{{ VITE_APP_TITLE }}</h1>
  </div>
</template>

<style scoped lang="scss">
.login-header {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 60px;

  .title {
    padding-left: 20px;
    font-size: 32px;
  }
}
</style>
