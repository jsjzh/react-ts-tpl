import createAPI from "@/shared/createAPI";

const api = createAPI(import.meta.env.API);

export const login = (data: { usename: string; password: string }) =>
  api.postJSON<{}>(`/user/login`, data);
