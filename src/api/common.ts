import Api from './base';
import type { ResultData } from './base';

export type UploadRes = ResultData<{
  name: string;
  url: string;
}>;

// 文件上传
export const uploadFile = (data: FormData): Promise<UploadRes> =>
  Api.post('/common/uploadFile', data);
