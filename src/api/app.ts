import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.VITE_HOST);

// 获取用户列表
export const getUsers = (data: { name?: string } & BASE.IPage) =>
  api.getJSON<BASE.PaginationResp<API.User>>(`/users`, data);

// 获取用户详细信息
export const getUser = (data: { id: number }) =>
  api.getJSON<API.User>(`/user/${data.id}`, data);

// 新增用户
export const postUser = (data: { name: string; age: number }) =>
  api.postJSON<boolean>(`/user`, data);

// 修改用户信息
export const patchUser = (data: { id: number; name?: string; age?: number }) =>
  api.patchJSON<boolean>(`/user/${data.id}`, data);

// 删除用户
export const deleteUser = (data: { id: number }) =>
  api.deleteJSON<boolean>(`/user/${data.id}`, data);
