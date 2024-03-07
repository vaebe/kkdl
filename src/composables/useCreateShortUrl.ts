import { ref } from 'vue';
import type { Ref } from 'vue';
import { createShortUrl as shortUrlCreate } from '@/api/shortUrl.ts';
import { ElLoading } from 'element-plus';

interface CreateShortUrlOpts {
  cb?: () => void;
}

interface UseCreateShortUrlRes {
  shortUrlFormRef: Ref;
  createShortUrl: (opts: CreateShortUrlOpts) => void;
}

export const useCreateShortUrl = (): UseCreateShortUrlRes => {
  const { VITE_APP_BASE_URL } = import.meta.env;

  const shortUrlFormRef = ref();

  const loading = ref();

  // 创建短链
  const createShortUrl = (opts: CreateShortUrlOpts): void => {
    if (!shortUrlFormRef.value.checkData()) {
      return;
    }

    loading.value = ElLoading.service({
      text: '正在创建中...',
      lock: true,
      background: 'rgba(0, 0, 0, 0.7)'
    });

    shortUrlCreate(shortUrlFormRef.value.getData())
      .then((res) => {
        const url = res.data?.shortUrl || '';
        if (!url) {
          ElMessage.error('短链生成错误！');
          return;
        }

        // 重置表单数据
        shortUrlFormRef.value.resetData();

        const shortUrl = VITE_APP_BASE_URL.replace('api', url);
        ElMessageBox.alert(shortUrl, '创建成功,生成的短链如下：', {
          type: 'success',
          autofocus: true,
          center: true,
          draggable: true
        });

        // 执行回调函数
        opts?.cb?.();
      })
      .finally(() => {
        loading.value?.close();
      });
  };

  return {
    shortUrlFormRef,
    createShortUrl
  };
};
