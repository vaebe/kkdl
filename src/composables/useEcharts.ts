import type { LineSeriesOption } from 'echarts/charts'
import type { DatasetComponentOption, GridComponentOption, TooltipComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import { useResizeObserver } from '@vueuse/core'
import { LineChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, TooltipComponent, TransformComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'
import { debounce } from 'lodash-es'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption< | LineSeriesOption | TooltipComponentOption | GridComponentOption | DatasetComponentOption>

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LineChart, LabelLayout, UniversalTransition, SVGRenderer])

export function useEcharts() {
  function initChart(dom: HTMLElement, option: ECOption) {
    const echartsDom = echarts.getInstanceByDom(dom)
    // 加载过图表 清除后加载
    if (echartsDom)
      echartsDom?.dispose && echartsDom.dispose()

    const chartBox = echarts.init(dom)
    chartBox.setOption(option)

    useResizeObserver(document.body, debounce(() => {
      chartBox.resize()
    }, 100))
  }

  return {
    initChart,
    echarts,
  }
}
