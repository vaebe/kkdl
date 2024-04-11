<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

const MiniProgramCodeLogin = defineAsyncComponent(
  () => import('./components/MiniProgramCodeLogin.vue'),
)
const EmailLogin = defineAsyncComponent(
  () => import('./components/EmailLogin.vue'),
)
const CHeader = defineAsyncComponent(() => import('./components/CHeader.vue'))
const CFooter = defineAsyncComponent(() => import('./components/CFooter.vue'))
const LoginTypeTabs = defineAsyncComponent(() => import('./components/LoginTypeTabs.vue'))

const loginType = ref('0')
</script>

<template>
  <div class="login">
    <CHeader />
    <div class="login-content bg-white dark:bg-stone-900">
      <div class="w-[300px]  mr-20">
        <LoginTypeTabs v-model="loginType" class="mb-4" />
        <MiniProgramCodeLogin v-if="loginType === '1'" />
        <EmailLogin v-else />
      </div>
    </div>
    <CFooter />
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;

  .login-content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100vw;
    height: calc(100vh - 100px);
  }
}
</style>
