<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'
import type { AnalyzeParams, AnalyzeShortLinkAccessByRegionInfo } from '@/api/analytics.ts'
import { analyzeShortLinkAccessByRegion } from '@/api/analytics.ts'

const searchForm = inject<AnalyzeParams>('searchForm')

const list = ref<AnalyzeShortLinkAccessByRegionInfo[]>([])
function getData() {
  analyzeShortLinkAccessByRegion({ code: '', dateType: searchForm!.dateType }).then((res) => {
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
function getPercentage(item: AnalyzeShortLinkAccessByRegionInfo) {
  if (list.value?.length === 1) {
    return 100
  }
  else {
    const curValue = item.clicks ?? 0
    return (curValue / maxValue.value) * 100
  }
}

function getIcon(code: string) {
  return `https://flag.vercel.app/m/${code}.svg`
}
</script>

<template>
  <div class="relative z-0 border border-gray-200 bg-white px-7 py-5 sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
    <p class="my-2">
      <span>国家</span>
    </p>

    <el-scrollbar style="height: 40vh">
      <div
        v-for="item in list" :key="item.countryCode"
        class="group flex items-center justify-between mb-1 hover:bg-gray-50"
      >
        <div class="relative z-10 flex h-8 w-full max-w-[calc(100%-2rem)] items-center">
          <div class="z-10 flex items-center space-x-2 px-2">
            <img :alt="item.countryCode" :src="getIcon(item.countryCode)" class="h-3 w-5">
            <div class="truncate text-sm text-gray-800 underline-offset-4 group-hover:underline">
              {{ item.country }}
            </div>
          </div>
          <div
            class="absolute h-full origin-left rounded-sm bg-orange-100"
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
