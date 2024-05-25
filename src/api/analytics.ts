import Api from './base'
import type { ResultData } from './base'

export interface AnalyzeParams {
  code: string
  dateType: '24h' | '7d' | '30d'
}

export interface AnalyzeShortLinkAccessByTimeInfo {
  clicks: number
  time: string
}

// 根据时间分析短链访问数据
export function analyzeShortLinkAccessByTime(params: AnalyzeParams): Promise<ResultData<AnalyzeShortLinkAccessByTimeInfo[]>> {
  return Api.get('/analytics/clicksTime', { params })
}

export interface AnalyzeShortLinkAccessByRegionInfo {
  clicks: number
  countryCode: string
  country: string
}

// 根据区域分析短链访问数据
export function analyzeShortLinkAccessByRegion(params: AnalyzeParams): Promise<ResultData<AnalyzeShortLinkAccessByRegionInfo[]>> {
  return Api.get('/analytics/clicksRegion', { params })
}
