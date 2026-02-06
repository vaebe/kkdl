import type { ResultData } from './base'
import Api from './base'

export interface UserInfo {
  id: string
  email: string
  nickName: string
  accountType: string
  role: string
  avatar: string
  updatedAt: string | null
  createdAt: string
  deletedAt: string | null
}

export interface LoginResData {
  token: string
  tokenExpire: string
  userInfo: UserInfo
}

export interface LoginParams {
  email: string
  password: string
}

// 用户登录
export function userLogin(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/login/emailLogin', data)
}

// github 登录
export function githubLogin(data: { code: string }): Promise<ResultData<LoginResData>> {
  return Api.post('/login/githubLogin', data)
}

// 用户退出登录
export function userLoginOut({ token }: { token: string }): Promise<ResultData<LoginResData>> {
  const config = token
    ? {
        headers: { authorization: `Bearer ${token}` },
      }
    : {}
  return Api.get('/login/signOut', config)
}

// 获取邮箱验证码
export function getCaptcha(params: { email: string }): Promise<ResultData<string>> {
  return Api.get('/common/getCaptcha', { params })
}

// 用户注册
export function userRegister(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/user/registration', data)
}

// 邮箱验证码登录
export function emailVerificationCodeLogin(data: { email: string, code: string }): Promise<ResultData<LoginResData>> {
  return Api.post('/login/verificationCodeLogin', data)
}

// 获取用户详情
export function getUserDetails(params: { id: string }): Promise<ResultData<UserInfo>> {
  return Api.get('/user/getUserInfo', { params })
}

// 检查用户是否已经注册
export function userRegCheck(params: { email: string }): Promise<ResultData<{ isRegistered: boolean }>> {
  return Api.get('/login/userRegCheck', { params })
}
