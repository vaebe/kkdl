import Api from './base'
import type { ResultPageListData } from './base'
import type { PaginationParameter } from '@/types'

export interface GetShortUrlVisitsListParams extends PaginationParameter {
  code: string
}

export interface ShortUrlVisitsInfo {
  createdAt?: string
  deletedAt?: string
  id?: number
  ip?: string
  rawUrl?: string
  secChUa?: string
  secChUaMobile?: string
  secChUaPlatform?: string
  secFetchUser?: string
  shortUrl?: string
  updatedAt?: string
  userAgent?: string
  userId?: string
  [property: string]: any
}

// 获取短链列表
export function getShortUrlVisitsList(data: GetShortUrlVisitsListParams): Promise<ResultPageListData<ShortUrlVisitsInfo>> {
  return Api.post('/shortUrlVisits/getList', data)
}
