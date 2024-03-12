import Api from './base'
import type { ResultData, ResultPageListData } from './base'
import type { PaginationParameter } from '@/types'

export interface CreateParams {
  title: string
  rawUrl: string
  expirationTime: string
}

export interface CreateResData {
  shortUrl: string
}

// 创建短链
export function createShortUrl(data: CreateParams): Promise<ResultData<CreateResData>> {
  return Api.post('/shortUrl/create', data)
}

export interface SearchParams {
  title: string
  rawUrl: string
}

export interface GetShortUrlListParams
  extends PaginationParameter,
  SearchParams {}

export interface ShortUrlInfo {
  id: number
  shortUrl: string
  rawUrl: string
  expirationTime: string
  userId: string
  createdAt: string
  title: string
  groupId: 0
}

// 获取短链列表
export function getShortUrlList(data: GetShortUrlListParams): Promise<ResultPageListData<ShortUrlInfo>> {
  return Api.post('/shortUrl/getList', data)
}

// 删除用户
export function deleteShortUrl(params: {
  id: number
}): Promise<ResultData<string>> {
  return Api.delete('/shortUrl/delete', { params })
}

// 批量导入短链
export function batchImportShortUrl(data: FormData): Promise<ResultData<string[]>> {
  return Api.post('/shortUrl/batchImport', data)
}

// 导入模版下载
export function templateDownloadShortUrl(): Promise<any> {
  return Api.get('/shortUrl/templateDownload', { responseType: 'arraybuffer' })
}

// 批量导出
export function batchExportShortUrl(data: SearchParams): Promise<any> {
  return Api.post('/shortUrl/batchExport', data, { responseType: 'arraybuffer' })
}
