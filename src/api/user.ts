import type { PaginationParameter } from '@/types'
import type { ResultData, ResultPageListData } from './base'
import Api from './base'

interface GetUserListParams extends PaginationParameter {
  nickName: string
  email: string
}

export interface UserInfo {
  id?: string
  email: string
  avatar: string
  nickName: string
  password?: string
  role: string
  accountType: string
  updatedAt: string | null
  createdAt: string
  deletedAt: string | null
}

// 获取用户列表
export function getUserList(data: GetUserListParams): Promise<ResultPageListData<UserInfo[]>> {
  return Api.post('/user/getList', data)
}

// 保存用户信息
export function saveUserInfo(data: UserInfo): Promise<ResultData<{ id: string }>> {
  return Api.post('/user/create', data)
}

// 更新用户信息
export function updateUserInfo(data: UserInfo): Promise<ResultData<{ id: string }>> {
  return Api.post('/user/update', data)
}

// 删除用户
export function removeUser(params: {
  id: number
}): Promise<ResultData<string>> {
  return Api.delete('/user/delete', { params })
}
