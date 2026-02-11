<script setup lang="ts">
import type { AnalyzeParams, AnalyzeShortLinkAccessByTimeInfo } from '@/api/analytics.ts'
import type { ECOption } from '@/composables/useEcharts'
import { analyzeShortLinkAccessByTime } from '@/api/analytics.ts'

const CardBox = defineAsyncComponent(() => import('@/components/CardBox.vue'))

const searchForm = inject<AnalyzeParams>('searchForm')

const { initChart, echarts } = useEcharts()

const list = ref<AnalyzeShortLinkAccessByTimeInfo[]>([])

const visitsToTal = ref(0)

async function initLineChart() {
  visitsToTal.value = list.value.reduce((a, b) => {
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
      data: list.value.map(item => item.time),
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
        data: list.value.map(item => item.clicks),
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

const loading = ref(false)

function getData() {
  loading.value = true
  list.value = []

  analyzeShortLinkAccessByTime({ code: '', dateType: searchForm!.dateType })
    .then((res) => {
      if (res.code === 0) {
        list.value = res.data ?? []
        initLineChart()
      }
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  watch(() => searchForm, () => {
    if (searchForm?.dateType) {
      getData()
    }
  }, { immediate: true, deep: true })
})
</script>

<template>
  <CardBox v-loading="loading" class="relative z-0 ">
    <p class="my-2">
      <span>总数:</span>
      <span class="ml-2">{{ visitsToTal }}</span>
    </p>
    <div id="lintChart" class="h-60" />
  </CardBox>
</template>

<style scoped lang="scss">

</style>
