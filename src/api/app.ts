import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.VITE_API_HOST);

// 获取用户列表
export const getUsers = (data: { name?: string } & BASE.IPage) =>
  api.getJson<BASE.PaginationResp<API.User>>(`/users`, data);
