<script setup lang="ts">
import { defineAsyncComponent, nextTick, ref } from 'vue';
import { useCreateShortUrl } from '@/composables/useCreateShortUrl';

const ShortUrlForm = defineAsyncComponent(
  () => import('@/components/ShortUrlForm.vue')
);

const emit = defineEmits(['refresh-data']);

const dialogVisible = ref(false);

const { createShortUrl, shortUrlFormRef } = useCreateShortUrl();

// 创建短链
const create = () => {
  createShortUrl({
    cb: () => {
      dialogVisible.value = false;
      emit('refresh-data');
    }
  });
};

const openDialog = () => {
  dialogVisible.value = true;

  nextTick(() => {
    shortUrlFormRef.value.resetData();
  });
};

defineExpose({
  openDialog
});
</script>

<template>
  <el-dialog v-model="dialogVisible" title="创建短链" width="680px">
    <short-url-form ref="shortUrlFormRef"></short-url-form>
    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="create">创建</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
