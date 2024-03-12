import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import { useUserStore } from '@/stores'
import type { AnyObject } from '@/types'

export interface ResultData<T> {
  code: number
  data: T
  message: string
}

export interface ResultPageListData<T> {
  code: number
  data: {
    list: T
    pageNo: number
    pageSize: number
    total: number
  }
  message: string
}

const { VITE_APP_AXIOS_TIMEOUT, VITE_APP_BASE_URL } = import.meta.env

// 创建axios实例
const service = axios.create({
  baseURL: VITE_APP_BASE_URL,
  paramsSerializer: (params) => {
    // get 请求添加时间戳  防止缓存
    params.client = 'web'
    params.timestamp = new Date().getTime()
    return stringify(params, { arrayFormat: 'brackets' })
  },
  timeout: Number.parseInt(VITE_APP_AXIOS_TIMEOUT || 0),
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { getToken } = useUserStore()

    // header 中添加 authorization
    config.headers.authorization = `Bearer ${getToken() || ''}`

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

const ERROR_TYPE_OBJ = {
  400: '400请求错误',
  401: '用户登录失效，请重新登录...',
  403: '403拒绝访问',
  404: '404请求路径错误',
  405: '405请求类型错误',
  408: '请求超时',
  500: '服务器错误',
  501: '服务未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'HTTP版本不受支持',
}

// 错误处理
function handleError(error: AnyObject): AnyObject {
  if (error.message === 'Network Error')
    error.msg = '请检查网络是否畅通...'

  const { response } = error
  if (response)
    error.msg = ERROR_TYPE_OBJ[response.status as keyof typeof ERROR_TYPE_OBJ]

  const status401 = error.code === 401 || (response && response.status === 401)
  if (status401 && window.location.hash !== '#/login') {
    useUserStore().clearLoginInfo().then()
    error.msg = '登录已过期请重新登录！'
  }

  const errorMsg: string = error.msg || error.message

  console.warn('请求错误:', errorMsg, '\r\n', response, '\r\n', error)

  ElMessage.closeAll()
  ElMessage.warning(`错误：${errorMsg || '请求错误！'}`)
  return error
}

// 尝试将响应数据格式化成jason 失败返回原数据
function formatTheResponseDataToJson<T>(data: T): T {
  const enc = new TextDecoder('utf-8')
  const uint8Msg = new Uint8Array(data as ArrayBufferLike)
  try {
    return JSON.parse(enc.decode(uint8Msg))
  }
  catch (e) {
    return data
  }
}

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    const formatTheResponseData = formatTheResponseDataToJson(response.data)
    if (formatTheResponseData.code && formatTheResponseData.code !== 0)
      return Promise.reject(handleError(formatTheResponseData))

    return res
  },
  (error) => {
    // 后端请求 401 时仍返回 200 状态码，所以此处无需处理 401
    return Promise.reject(handleError(error))
  },
)

export default service
