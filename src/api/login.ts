import { stringify } from 'qs'
import Api from './base'
import type { ResultData } from './base'

export interface UserInfo {
  id: string
  email: string
  wxId: string
  nickName: string
  accountType: string
  role: string
  avatar: string
}

export interface LoginResData {
  token: string
  tokenExpire: string
  userInfo: UserInfo
}

export interface LoginParams {
  email: string
  password: string
  accountType: string
}

export interface GetMiniProgramCodeParams {
  scene: string
  page: string
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
export function userLoginOut(): Promise<ResultData<LoginResData>> {
  return Api.get('/login/signOut')
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
  return Api.post('/login/verificationCode', data)
}

// 获取用户详情
export function getUserDetails(params: { id: string }): Promise<ResultData<UserInfo>> {
  return Api.get('/user/getUserInfo', { params })
}

const { VITE_APP_BASE_URL } = import.meta.env

// 获取小程序码
export function getMiniProgramCode(params: GetMiniProgramCodeParams): any {
  return `${
    VITE_APP_BASE_URL as string
  }/weChatMiniProgram/getMiniProgramCode?${stringify(params)}`
}

// 检查用户是否已经注册
export function userRegCheck(params: { email: string }): Promise<ResultData<{ isRegistered: boolean }>> {
  return Api.post('/login/userRegCheck', { params })
}
