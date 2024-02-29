import fileDownload from 'js-file-download';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';

export type FileDownloadType = string | ArrayBuffer | ArrayBufferView | Blob;

interface DownloadStreamingFileOpts {
  data: FileDownloadType;
  name: string;
  type: string;
}

interface UseFileDownloadRes {
  downloadStreamingFile: (opts: DownloadStreamingFileOpts) => void;
}

export const useFileDownload = (): UseFileDownloadRes => {
  const downloadStreamingFile = (opts: DownloadStreamingFileOpts): void => {
    const { data, name, type = '.xls' } = opts;
    if (!name) {
      ElMessage.warning('文件名称不能为空！');
      return;
    }

    fileDownload(
      data,
      `${name}${dayjs().format('YYYY-MM-DD HH:mm:ss')}${type}`
    );
  };

  return {
    downloadStreamingFile
  };
};
