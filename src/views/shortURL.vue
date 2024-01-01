<script setup lang="ts">
import { reactive, defineAsyncComponent } from 'vue';
import dayjs from 'dayjs';
import { createShortURL } from '@/api/shortURL.ts';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const LayoutHeader = defineAsyncComponent(
  () => import('@/components/LayoutHeader.vue')
);

const { VITE_APP_BASE_URL } = import.meta.env;

const userStore = useUserStore();
const { isLogin } = storeToRefs(userStore);

// 禁用今日之前的日期
const isDateBeforeToday = (time) => {
  return time.getTime() < new Date(new Date().toDateString()).getTime();
};

const info = reactive({
  title: '',
  rawUrl: '',
  expirationTime: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss')
});

const checkData = (): boolean => {
  if (!info.title) {
    ElMessage.warning('请填写短链标题！');
    return false;
  }

  if (!info.rawUrl) {
    ElMessage.warning('请填写跳转的地址！');
    return false;
  }

  if (
    !info.rawUrl.startsWith('https://') &&
    !info.rawUrl.startsWith('http://')
  ) {
    ElMessage.warning('请输入 http:// 或 https:// 开头的跳转链接!');
    return false;
  }

  if (!info.expirationTime) {
    ElMessage.warning('请选择过期时间！');
    return false;
  }

  return true;
};

// 创建短链
const create = () => {
  if (!checkData()) {
    return;
  }

  createShortURL(info).then((res) => {
    console.log(res.data);

    const url = res.data?.shortUrl || '';
    if (!url) {
      ElMessage.error('短链生成错误！');
      return;
    }

    const shortUrl = VITE_APP_BASE_URL.replace('api', url);

    ElMessageBox.alert(shortUrl, '生成的短链如下：', {
      autofocus: true,
      center: true,
      draggable: true
    });
  });
};
</script>

<template>
  <div class="short-url flex flex-col items-center">
    <layout-header class="mb-4"></layout-header>

    <el-card class="w-11/12 lg:w-8/12">
      <el-form
        ref="ruleFormRef"
        :model="info"
        label-width="120px"
        size="large"
        label-position="top"
        status-icon
      >
        <el-form-item label="短链名称:">
          <el-input
            v-model="info.title"
            placeholder="请输入短链名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="跳转链接:" prop="rawUrl">
          <el-input
            v-model="info.rawUrl"
            placeholder="请输入跳转链接"
            clearable
          />
        </el-form-item>

        <el-form-item v-if="isLogin" label="过期时间:">
          <el-date-picker
            v-model="info.expirationTime"
            type="date"
            label="过期时间"
            placeholder="请选择过期时间"
            :disabled-date="isDateBeforeToday"
          />
        </el-form-item>
      </el-form>

      <el-row justify="center">
        <el-button type="primary" @click="create">创建短链</el-button>
      </el-row>
    </el-card>

    <ul class="w-11/12 lg:w-8/12 text-gray-500">
      <li class="mt-4 text-center text-xl">提示:</li>
      <li>1. 生成的短链默认有效期一个月，登录后可指定任意时间。</li>
      <li>2. 仅用于学习使用。</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.short-url {
  width: 100vw;
  height: 100vh;
  background: var(--el-bg-color);
}
</style>
