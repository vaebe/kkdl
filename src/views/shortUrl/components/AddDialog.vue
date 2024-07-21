<script setup lang="ts">
import { useCreateShortUrl } from '@/composables/useCreateShortUrl.ts'

const emit = defineEmits(['refreshData'])

const ShortUrlForm = defineAsyncComponent(
  () => import('@/components/ShortUrlForm.vue'),
)

const dialogVisible = ref(false)

const { createShortUrl, shortUrlFormRef } = useCreateShortUrl()

// 创建短链
function create() {
  createShortUrl({
    cb: () => {
      dialogVisible.value = false
      emit('refreshData')
    },
  })
}

function openDialog() {
  dialogVisible.value = true
}

function dialogOpened() {
  nextTick(() => {
    shortUrlFormRef.value.resetData()
  })
}

defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="创建短链" width="680px" @opened="dialogOpened">
    <ShortUrlForm ref="shortUrlFormRef" />
    <template #footer>
      <div class="flex justify-center">
        <el-button type="primary" @click="create">
          创建
        </el-button>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
