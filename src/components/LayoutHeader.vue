<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const ThemeSwitch = defineAsyncComponent(() => import('./ThemeSwitch.vue'));

const { VITE_APP_TITLE } = import.meta.env;

const userStore = useUserStore();
const { userInfo, isLogin } = storeToRefs(userStore);

const router = useRouter();
// 跳转
const jumpLoginPage = () => {
  router.push('/login');
};

const jumpRegisterUserPage = () => {
  router.push('/register');
};
</script>

<template>
  <div class="layout-header">
    <h1 class="title mt-2 text-2xl">{{ VITE_APP_TITLE }}</h1>

    <div class="menu"></div>

    <div class="flex justify-end items-center">
      <p v-if="isLogin">{{ userInfo.nickname }}</p>
      <p v-else class="cursor-pointer">
        <span class="hover:text-blue-500" @click="jumpLoginPage">登录</span>
        ｜
        <span class="hover:text-blue-500" @click="jumpRegisterUserPage">
          注册
        </span>
      </p>
      <theme-switch class="ml-2"></theme-switch>
    </div>
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
