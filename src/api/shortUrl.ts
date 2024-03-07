import Api from './base';
import type { ResultData, ResultPageListData } from './base';
import type { PaginationParameter } from '@/types';

export interface CreateParams {
  title: string;
  rawUrl: string;
  expirationTime: string;
}

export interface CreateResData {
  shortUrl: string;
}

// 创建短链
export const createShortUrl = (
  data: CreateParams
): Promise<ResultData<CreateResData>> => Api.post('/shortUrl/create', data);

export interface SearchParams {
  title: string;
  rawUrl: string;
}

export interface GetShortUrlListParams
  extends PaginationParameter,
    SearchParams {}

export interface ShortUrlInfo {
  id: number;
  shortUrl: string;
  rawUrl: string;
  expirationTime: string;
  userId: string;
  createdAt: string;
  title: string;
  groupId: 0;
}

// 获取短链列表
export const getShortUrlList = (
  data: GetShortUrlListParams
): Promise<ResultPageListData<ShortUrlInfo>> =>
  Api.post('/shortUrl/getList', data);

// 删除用户
export const deleteShortUrl = (params: {
  id: number;
}): Promise<ResultData<string>> => Api.delete('/shortUrl/delete', { params });

// 批量导入短链
export const batchImportShortUrl = (
  data: FormData
): Promise<ResultData<string[]>> => Api.post('/shortUrl/batchImport', data);

// 导入模版下载
export const templateDownloadShortUrl = (): Promise<any> =>
  Api.get('/shortUrl/templateDownload', { responseType: 'arraybuffer' });

// 批量导出
export const batchExportShortUrl = (data: SearchParams): Promise<any> =>
  Api.post('/shortUrl/batchExport', data, { responseType: 'arraybuffer' });
