import Api from './base';
import type { ResultData, ResultPageListData } from './base';
import type { PaginationParameter } from '@/types';

interface GetUserListParams extends PaginationParameter {
  nickName: string;
  email: string;
  wxId: string;
}

export interface UserInfo {
  id?: string;
  email: string;
  wxId: string;
  avatar: string;
  nickName: string;
  password?: string;
  role: number;
  updated_at: string;
  created_at: string;
}

// 获取用户列表
export const getUserList = (
  data: GetUserListParams
): Promise<ResultPageListData<UserInfo[]>> => Api.post('/user/getList', data);

// 保存用户信息
export const saveUserInfo = (
  data: UserInfo
): Promise<ResultData<{ id: string }>> => Api.post('/user/create', data);

// 更新用户信息
export const updateUserInfo = (
  data: UserInfo
): Promise<ResultData<{ id: string }>> => Api.post('/user/update', data);

// 删除用户
export const removeUser = (params: {
  id: number;
}): Promise<ResultData<string>> => Api.delete('/user/delete', { params });
