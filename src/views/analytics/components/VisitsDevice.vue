<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import type { AnalyzeDeviceParams, AnalyzeParams, AnalyzeShortLinkAccessByDeviceInfo } from '@/api/analytics.ts'
import { analyzeShortLinkAccessByDevice } from '@/api/analytics.ts'

const typeList = [{ label: 'Devices', value: 'devices' }, { label: 'Browsers', value: 'browsers' }, { label: 'OS', value: 'os' }]

const curType = ref<AnalyzeDeviceParams['type']>('devices')

const searchForm = inject<AnalyzeParams>('searchForm')

const list = ref<AnalyzeShortLinkAccessByDeviceInfo[]>([])
function getData() {
  analyzeShortLinkAccessByDevice({ code: '', dateType: searchForm!.dateType, type: curType.value }).then((res) => {
    if (res.code === 0)
      list.value = res.data ?? []
  })
}

const searchFormWatch = watch(() => searchForm, () => {
  if (searchForm?.dateType)
    getData()
}, { immediate: true, deep: true })

onBeforeUnmount(() => {
  searchFormWatch()
})

const maxValue = computed(() => Math.max(...list.value.map(item => item.clicks)))

// 获取百分比
function getPercentage(item: AnalyzeShortLinkAccessByDeviceInfo) {
  if (list.value?.length === 1) {
    return 100
  }
  else {
    const curValue = item.clicks ?? 0
    return (curValue / maxValue.value) * 100
  }
}
</script>

<template>
  <div class="relative z-0 border border-gray-200 bg-white px-7 py-5 sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
    <el-segmented v-model="curType" class="my-2" :options="typeList" block @change="getData" />

    <el-scrollbar style="height: 40vh">
      <div
        v-for="item in list" :key="item.name"
        class="group flex items-center justify-between mb-1 hover:bg-gray-50"
      >
        <div class="relative z-10 flex h-8 w-full max-w-[calc(100%-2rem)] items-center">
          <div class="z-10 flex items-center space-x-2 px-2">
            <div class="truncate text-sm text-gray-800 underline-offset-4 group-hover:underline">
              {{ item.name }}
            </div>
          </div>
          <div
            class="absolute h-full origin-left rounded-sm bg-green-100"
            :style="{ width: `${getPercentage(item)}%`, transform: 'scaleX(1)' }"
          />
        </div>
        <p class="z-10 px-2 text-sm text-gray-600">
          {{ item.clicks }}
        </p>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">

</style>
