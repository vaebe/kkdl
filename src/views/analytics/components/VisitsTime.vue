<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ECOption } from '@/composables'
import { useEcharts } from '@/composables'
import { type AnalyzeParams, analyzeShortLinkAccessByTime } from '@/api/analytics.ts'

const searchForm = inject<AnalyzeParams>('searchForm')

const { initChart, echarts } = useEcharts()

const visitsToTal = ref(0)

async function initLineChart() {
  const res = await analyzeShortLinkAccessByTime({ code: '', dateType: searchForm!.dateType })

  const list = res.code === 0 ? res.data ?? [] : []

  visitsToTal.value = list.reduce((a, b) => {
    return a + b.clicks
  }, 0)

  const option: ECOption = {
    color: 'rgba(29,78,186,1)',
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: '2%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: list.map(item => item.time),
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(135,140,147,0.8)',
        },
      },
    },
    series: [
      {
        name: 'Visits',
        type: 'line',
        data: list.map(item => item.clicks),
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(29,78,186, 0.3)',
              },
              {
                offset: 0.8,
                color: 'rgba(29,78,186, 0)',
              },
            ],
            false,
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        },
      },
    ],
  }

  initChart(document.getElementById('lintChart') as HTMLElement, option)
}

const searchFormWatch = ref()

onMounted(() => {
  searchFormWatch.value = watch(() => searchForm, () => {
    if (searchForm?.dateType)
      initLineChart()
  }, { immediate: true, deep: true })
})

onBeforeUnmount(() => {
  searchFormWatch?.value()
})
</script>

<template>
  <div class="relative z-0 border border-gray-200 bg-white px-7 py-5 sm:rounded-lg sm:border-gray-100 sm:shadow-lg">
    <p class="my-2">
      <span>总数:</span>
      <span class="ml-2">{{ visitsToTal }}</span>
    </p>
    <div id="lintChart" class="h-[240px] " />
  </div>
</template>

<style scoped lang="scss">

</style>
