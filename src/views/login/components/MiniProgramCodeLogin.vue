<script setup lang="ts">
import { getMiniProgramCode } from '@/api/login';
import { useWebSocket } from '@vueuse/core';
import { onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '@/stores';

const props = defineProps({
  userCode: {
    required: true,
    type: String,
    default: ''
  },
  page: {
    required: true,
    type: String,
    default: ''
  }
});

const { VITE_APP_LOGIN_WS_URL } = import.meta.env;

const {
  status,
  data: wsData,
  close
} = useWebSocket(`${VITE_APP_LOGIN_WS_URL}?userCode=${props.userCode}`);

const { setLoginResData } = useUserStore();

// 监听 WebSocket 推送数据
const wsDataWatch = watch(
  () => wsData.value,
  () => {
    if (['OPEN', 'CONNECTING'].includes(status.value)) {
      const res = JSON.parse(wsData.value);

      if (res.dataType === 'loginSuccess') {
        setLoginResData(res);
        ElMessage.success('登录成功!');
      }
    }
  }
);

// 离开页面关闭 WebSocket 连接
onBeforeUnmount(() => {
  close();
  wsDataWatch();
});
</script>

<template>
  <div class="miniProgramCode w-full">
    <img
      class="w-full h-full"
      :src="getMiniProgramCode({ scene: props.userCode as string, page })"
      alt="miniProgramCode"
    />
  </div>
</template>

<style scoped lang="scss"></style>
