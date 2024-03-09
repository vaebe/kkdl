<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useCreateShortUrl } from '@/composables';

const ShortUrlForm = defineAsyncComponent(
  () => import('@/components/ShortUrlForm.vue')
);

const { createShortUrl, shortUrlFormRef } = useCreateShortUrl();
</script>

<template>
  <div class="flex flex-col items-center">
    <el-card class="w-11/12 lg:w-8/12 mt-4">
      <short-url-form ref="shortUrlFormRef"></short-url-form>
      <el-row justify="center">
        <el-button type="primary" @click="() => createShortUrl({})">
          创建短链
        </el-button>
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
