import Api from './base'
import type { ResultPageListData } from './base'
import type { PaginationParameter } from '@/types'

export interface GetShortUrlVisitsListParams extends PaginationParameter {
  code: string
}

export interface ShortUrlVisitsInfo {
  id: string // 主键ID
  userId: string // 用户ID
  shortUrl: string // 短链,唯一，不能为空
  rawUrl: string // 原始URL，不能为空
  ip: string // IP地址，不能为空
  userAgent: string // 客户端软件的类型、版本和其他相关信息
  secChUa: string // 客户端使用的浏览器和版本
  secChUaMobile: string // 请求是否来自移动设备。?0 表示不是移动设备，?1 表示是移动设备
  secChUaPlatform: string // 客户端所运行的平台
  secFetchUser: string // 请求是否是用户发起的,?1 表示是用户发起的请求
  continent: string // 大洲名称
  continentCode: string // 大洲代码
  country: string // 国家名称
  countryCode: string // 国家代码
  region: string // 地区或州的短代码（FIPS或ISO）
  regionName: string // 地区或州名称
  city: string // 城市名称
  district: string // 位置的区（郡）
  lat: number // 纬度
  lon: number // 经度
  createdAt: string // 创建时间，默认为当前时间戳
  updatedAt: string // 更新时间
  deletedAt: string // 删除时间
}

// 获取短链列表
export function getShortUrlVisitsList(data: GetShortUrlVisitsListParams): Promise<ResultPageListData<ShortUrlVisitsInfo>> {
  return Api.post('/shortUrlVisits/getList', data)
}
