import { createAPI } from "@/shared/API";

const api = createAPI(import.meta.env.VITE_HOST);

// 获取用户列表
export const getUsers = (data: { name?: string } & BASE.IPage) =>
  api.getJson<BASE.PaginationResp<API.User>>(`/users`, data);

// 获取用户详细信息
export const getUser = (data: { id: number }) =>
  api.getJson<API.User>(`/user/${data.id}`, data);

// 新增用户
export const postUser = (data: { name: string; age: number }) =>
  api.postJson<boolean>(`/user`, data);

// 修改用户信息
export const patchUser = (data: { id: number; name?: string; age?: number }) =>
  api.patchJson<boolean>(`/user/${data.id}`, data);

// 删除用户
export const deleteUser = (data: { id: number }) =>
  api.deleteJson<boolean>(`/user/${data.id}`, data);
