import { notification } from "antd";
import queryString from "query-string";

interface IPowerfulConfig {
  showNotification?: boolean;
  handleOk?: (response: Response) => any;
  handleNotOk?: (status: number, response: Response) => any;
  handleData?: (data: any) => any;
}

// eslint-disable-next-line no-undef
type IAPIConfig = IPowerfulConfig & RequestInit;

type IJsonpConfig = IPowerfulConfig & {
  param?: string;
  prefix?: string;
  name?: string;
  timeout?: number;
};

type IPromise<T = any> = Promise<T> & {
  cancel: () => void;
};

class API {
  private static jsonpCount = 0;

  public static handleJson(response: Response) {
    return response.json();
  }
  public static handleBlob(response: Response) {
    return response.blob();
  }

  public static handleStatus(status: number, response: Response) {
    if (status >= 400 && status <= 500) {
      throw new Error(
        `[${status} ${response.statusText}] 请求失败 ${response.url}`,
      );
    }
    return response.json();
  }

  public static handleData(data: any) {
    return data.data;
  }

  public hostURL: URL;
  public baseConfig: IAPIConfig;

  public constructor(host: string, config: IAPIConfig) {
    this.hostURL = new URL(host);
    this.baseConfig = config;
  }

  public getJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const queryStr = queryString.stringify(data);
    return this.request<T>(`${endpoint}?${queryStr}`, {
      method: "get",
      handleOk: API.handleJson,
      ...config,
    });
  }

  public postJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public putJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "put",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public patchJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "patch",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public deleteJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "delete",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public headJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "head",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public postForm<T = any>(
    endpoint: string,
    data: FormData,
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: data,
      handleOk: API.handleJson,
      ...config,
    });
  }

  public putForm<T = any>(
    endpoint: string,
    data: FormData,
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request<T>(endpoint, {
      method: "put",
      headers,
      body: data,
      handleOk: API.handleJson,
      ...config,
    });
  }

  public patchForm<T = any>(
    endpoint: string,
    data: FormData,
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request<T>(endpoint, {
      method: "patch",
      headers,
      body: data,
      handleOk: API.handleJson,
      ...config,
    });
  }

  public getBlob<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const queryStr = queryString.stringify(data);
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(`${endpoint}?${queryStr}`, {
      method: "get",
      headers,
      handleOk: API.handleBlob,
      ...config,
    });
  }

  public postBlob<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      ...config,
    });
  }

  public getUri(endpoint: string, data: Record<string | number, any> = {}) {
    const queryStr = queryString.stringify(data);
    const url = new URL(`${endpoint}?${queryStr}`, this.hostURL);
    return url.toString();
  }

  public request<T>(endpoint: string, config: IAPIConfig) {
    const url = new URL(endpoint, this.hostURL);
    const controller = new AbortController();

    const {
      showNotification = true,
      handleOk = API.handleJson,
      handleNotOk = API.handleStatus,
      handleData = API.handleData,
      ...currentConfig
    } = {
      ...this.baseConfig,
      ...config,
      ...controller,
    };

    const promise: any = fetch(url, {
      mode: "cors",
      credentials: "include",
      cache: "no-cache",
      ...currentConfig,
    })
      .then((response) => {
        // 200 <= response.status <= 299
        // 用来处理 json 或者 blob 返回
        if (response.ok) return handleOk(response);
        else return handleNotOk && handleNotOk(response.status, response);
      })
      .then(handleData)
      .catch((reason) => {
        showNotification &&
          notification.error({ message: `${reason || "未知"}` });
        throw new Error(`请求失败 ${reason}`);
      });

    promise.cancel = () => {
      controller.abort();
    };

    return promise as IPromise<T>;
  }

  public jsonp(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IJsonpConfig = {},
  ) {
    const uri = this.getUri(endpoint, data);
    const prefix = config.prefix || "__jp__";
    const id = config.name || `${prefix}${API.jsonpCount++}`;
    const param = config.param || "callback";
    const timeout = config.timeout ? config.timeout : 60000;
    const target = document.getElementsByTagName("script")[0] || document.head;
  }
}

export default API;

export const craeteAPI = (
  host: string,
  config: IAPIConfig = {
    showNotification: true,
  },
) => new API(host, config);
