import Api from './base'
import type { ResultData } from './base'

export type UploadRes = ResultData<{
  name: string
  url: string
}>

// 文件上传
export function uploadFile(data: FormData): Promise<UploadRes> {
  return Api.post('/common/uploadFile', data)
}
