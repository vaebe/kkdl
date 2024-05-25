import Api from './base'
import type { ResultData } from './base'

export interface AnalyzeShortLinkAccessByTimeParams {
  code: string
  dateType: '24h' | '7d' | '30d'
}

export interface AnalyzeShortLinkAccessByTimeInfo {
  clicks: number
  time: string
}

// 根据时间分析短链访问数据
export function analyzeShortLinkAccessByTime(params: AnalyzeShortLinkAccessByTimeParams): Promise<ResultData<AnalyzeShortLinkAccessByTimeInfo[]>> {
  return Api.get('/analytics/clicksTime', { params })
}
