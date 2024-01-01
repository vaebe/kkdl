import Api from './base';
import type { ResultData } from './base';

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
