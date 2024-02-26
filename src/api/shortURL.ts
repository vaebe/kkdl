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
export const createShortURL = (
  data: CreateParams
): Promise<ResultData<CreateResData>> => Api.post('/shortURL/create', data);

export interface GetShortURLListParams extends PaginationParameter {
  title: string;
  rawUrl: string;
}

export interface ShortURLInfo {
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
export const getShortURLList = (
  data: GetShortURLListParams
): Promise<ResultPageListData<ShortURLInfo>> =>
  Api.post('/shortURL/getList', data);

// 删除用户
export const deleteShortURL = (params: {
  id: number;
}): Promise<ResultData<string>> => Api.delete('/shortURL/delete', { params });
