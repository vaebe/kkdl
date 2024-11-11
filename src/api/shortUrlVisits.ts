import type { PaginationParameter } from '@/types'
import type { ResultPageListData } from './base'
import Api from './base'

export interface GetShortUrlVisitsListParams extends PaginationParameter {
  code: string
}

export interface ShortUrlVisitsInfo {
  id: number // bigint unsigned
  userId: string // 用户id
  shortUrl: string // 短链,唯一，不能为空
  rawUrl: string // 原始 url 不能为空
  userAgent: string // 用户代理字符串，存储提供的完整用户代理
  browserName: string | null // 浏览器名称
  browserVersion: string | null // 浏览器版本
  deviceModel: string | null // 设备型号
  engineName: string | null // 浏览器引擎名称
  engineVersion: string | null // 浏览器引擎版本
  osName: string | null // 操作系统名称
  osVersion: string | null // 操作系统版本
  ip: string // ip 不能为空
  continent: string | null // 大洲名称
  continentCode: string | null // 大洲代码
  country: string | null // 国家名称
  countryCode: string | null // 国家代码
  region: string | null // 地区或州的短代码（FIPS或ISO）
  regionName: string | null // 地区或州名称
  city: string | null // 城市名称
  district: string | null // 位置的区（郡）
  lat: number | null // 纬度
  lon: number | null // 经度
  createdAt: Date | null // 创建时间，默认为当前时间戳
  updatedAt: Date | null // 更新时间
  deletedAt: Date | null // 删除时间
}

// 获取短链列表
export function getShortUrlVisitsList(data: GetShortUrlVisitsListParams): Promise<ResultPageListData<ShortUrlVisitsInfo>> {
  return Api.post('/shortUrlVisits/getList', data)
}
