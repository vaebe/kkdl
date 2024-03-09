<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';

const MiniProgramCodeLogin = defineAsyncComponent(
  () => import('./components/MiniProgramCodeLogin.vue')
);
const EmailLogin = defineAsyncComponent(
  () => import('./components/EmailLogin.vue')
);
const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'));
const CFooter = defineAsyncComponent(() => import('./components/CFooter.vue'));
</script>

<template>
  <div class="login-box">
    <c-header></c-header>
    <div class="login-content bg-gray-50 dark:bg-stone-800">
      <div class="flex items-center justify-end">
        <mini-program-code-login></mini-program-code-login>
        <div class="line"></div>
        <email-login></email-login>
      </div>
    </div>
    <c-footer></c-footer>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;

  .login-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 100px);

    .line {
      width: 1px;
      height: 260px;
      margin: 0 40px;
      background: rgb(0 0 0 / 10%);
    }
  }
}
</style>
