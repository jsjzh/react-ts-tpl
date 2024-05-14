/// <reference types="vite/client" />

declare namespace BASE {
  interface IPage {
    pageNo: number;
    pageSize: number;
  }
  interface PPage {
    pageNo: number;
    pageSize: number;
    totalPage: number;
    totalSize: number;
  }

  type PaginationResp<T = {}> = {
    items: T[];
  } & BASE.PPage;

  interface Resp<T = any> {
    success: boolean;
    data: T;
    msg: string;
    code: number;
  }

  type AnyObject<T = {}> = T & Record<string, any>;
}
