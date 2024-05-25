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

export interface AnalyzeShortLinkAccessByCountriesInfo {
  clicks: number
  countryCode: string
  country: string
}

// 根据国家分析短链访问数据
export function analyzeShortLinkAccessByCountries(params: AnalyzeParams): Promise<ResultData<AnalyzeShortLinkAccessByCountriesInfo[]>> {
  return Api.get('/analytics/clicksCountries', { params })
}
