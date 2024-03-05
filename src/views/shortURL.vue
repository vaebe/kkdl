<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { createShortURL } from '@/api/shortURL.ts';

const ShortUrlForm = defineAsyncComponent(
  () => import('@/components/ShortUrlForm.vue')
);

const { VITE_APP_BASE_URL } = import.meta.env;

const shortUrlFormRef = ref();

// 创建短链
const create = () => {
  if (!shortUrlFormRef.value.checkData()) {
    return;
  }

  const info = shortUrlFormRef.value.getData();

  createShortURL(info).then((res) => {
    const url = res.data?.shortUrl || '';
    if (!url) {
      ElMessage.error('短链生成错误！');
      return;
    }

    // 重置表单数据
    shortUrlFormRef.value.resetData();

    const shortUrl = VITE_APP_BASE_URL.replace('api', url);
    ElMessageBox.alert(shortUrl, '创建成功,生成的短链如下：', {
      type: 'success',
      autofocus: true,
      center: true,
      draggable: true
    });
  });
};
</script>

<template>
  <div class="flex flex-col items-center">
    <el-card class="w-11/12 lg:w-8/12 mt-4">
      <short-url-form ref="shortUrlFormRef"></short-url-form>
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

<style scoped lang="scss"></style>
