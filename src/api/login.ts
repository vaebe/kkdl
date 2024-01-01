import Api from './base';
import type { ResultData } from './base';

export interface UserInfo {
  id: number;
  email: string;
  wxId: string;
  nickname: string;
  accountType: string;
  role: string;
  avatar: string;
}

export interface LoginResData {
  token: string;
  tokenExpire: string;
  userInfo: UserInfo;
}

export interface LoginParams {
  email: string;
  password: string;
  accountType: string;
}

export interface EmailVerificationCodeParams {
  email: string;
}

// 用户登录
export const userLogin = (
  data: LoginParams
): Promise<ResultData<LoginResData>> => Api.post('/login/emailLogin', data);

// 获取邮箱验证码
export const getVerificationCode = (
  data: EmailVerificationCodeParams
): Promise<ResultData<string>> => Api.post('/user/getVerificationCode', data);

// 用户注册
export const userRegister = (
  data: LoginParams
): Promise<ResultData<LoginResData>> => Api.post('/user/create', data);

// 获取用户详情
export const getUserDetails = (params: {
  id: number;
}): Promise<ResultData<UserInfo>> => Api.get('/user/getUserInfo', { params });
