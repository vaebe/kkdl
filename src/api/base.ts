import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { useUserStore } from '@/stores';

export interface ResultData<T> {
  code: number;
  data: T;
  message: string;
}

export interface ResultPageListData<T> {
  code: number;
  data: {
    list: T;
    pageNo: number;
    pageSize: number;
    total: number;
  };
  message: string;
}

const { VITE_APP_AXIOS_TIMEOUT, VITE_APP_BASE_URL } = import.meta.env;

// 创建axios实例
const service = axios.create({
  baseURL: VITE_APP_BASE_URL,
  paramsSerializer: (params) => {
    // get 请求添加时间戳  防止缓存
    params.client = 'web';
    params.timestamp = new Date().getTime();
    return stringify(params, { arrayFormat: 'brackets' });
  },
  timeout: parseInt(VITE_APP_AXIOS_TIMEOUT || 0)
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getToken } = useUserStore();

    // header 中添加 authorization
    config.headers.authorization = `Bearer ${getToken() || ''}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 401) {
      const userStore = useUserStore();
      userStore.clearLoginInfo();
      ElMessage.warning('登录已过期请重新登录！');
      return;
    }

    if (res.code !== 0) {
      // 服务端返回错误提示就展示
      const errorText =
        typeof res.message === 'string'
          ? res.message
          : Object.values(res.message).join('\r\n');
      ElMessage.error(errorText || '非常抱歉，遇到了一些错误！');
      return Promise.reject(errorText || 'error');
    }

    return res;
  },
  (error) => {
    // 后端请求 401 时仍返回 200 状态码，所以此处无需处理 401
    return Promise.reject(error);
  }
);

export default service;
