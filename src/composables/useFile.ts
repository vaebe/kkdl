import { useUserStore } from '@/stores';
import type { UploadProps } from 'element-plus';

export interface UseUploadOptsRes {
  uploadHeaders: {
    authorization: string;
  };
  uploadUrl: string;
  uploadFileTypeList: string[];
  beforeImgUpload: UploadProps['beforeUpload'];
}

export const useUploadOpts = (): UseUploadOptsRes => {
  const { getToken } = useUserStore();
  const token = getToken();
  const uploadHeaders = {
    authorization: token
  };

  const { VITE_APP_BASE_URL } = import.meta.env;
  const uploadUrl = `${VITE_APP_BASE_URL as string}/file/upload`;

  const uploadFileTypeList = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp'
  ];

  // 上传图片文件前置验证
  const beforeImgUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (!uploadFileTypeList.includes(rawFile.type)) {
      ElMessage.error(`只能上传${uploadFileTypeList.join(', ')}类型文件`);
      return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('文件大小不能超过 2MB!');
      return false;
    }
    return true;
  };

  return {
    uploadHeaders,
    uploadUrl,
    uploadFileTypeList,
    beforeImgUpload
  };
};
