import Api from './base';
import type { ResultData } from './base';

export type UploadRes = ResultData<string>;

// 文件上传
export const upload = (data: FormData): Promise<UploadRes> =>
  Api.post('/file/upload', data);
