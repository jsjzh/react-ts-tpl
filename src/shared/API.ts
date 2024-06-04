import { notification } from "antd";
import queryString from "query-string";

interface IPowerfulConfig {
  showNotification?: boolean;
  handleResponse?: (response: Response) => any;
  handleData?: (data: any) => any;
  handleStatus?: (status: number, data: any) => any;
}

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

  public hostURL: URL;
  public baseConfig: IAPIConfig;

  public constructor(host: string, config: IAPIConfig) {
    this.hostURL = new URL(host);
    this.baseConfig = config;
  }

  public getJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const queryStr = queryString.stringify(data);
    const headers = new Headers();
    headers.append("content-type", "application/x-www-form-urlencoded");
    return this.request(`${endpoint}?${queryStr}`, {
      method: "get",
      headers,
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public postJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public putJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "put",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public patchJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "patch",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public deleteJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "delete",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public headJson(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "head",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public postForm(endpoint: string, data: FormData, config: IAPIConfig = {}) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request(endpoint, {
      method: "post",
      headers,
      body: data,
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public putForm(endpoint: string, data: FormData, config: IAPIConfig = {}) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request(endpoint, {
      method: "put",
      headers,
      body: data,
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public patchForm(endpoint: string, data: FormData, config: IAPIConfig = {}) {
    const headers = new Headers();
    headers.append("content-type", "multipart/form-data");
    return this.request(endpoint, {
      method: "patch",
      headers,
      body: data,
      handleResponse: API.handleJson,
      ...config,
    });
  }

  public getBlob(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const queryStr = queryString.stringify(data);
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(`${endpoint}?${queryStr}`, {
      method: "get",
      headers,
      handleResponse: API.handleBlob,
      ...config,
    });
  }

  public postBlob(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleResponse: API.handleBlob,
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
      handleResponse,
      handleStatus,
      handleData = (standard: any) => standard,
      ...currentConfig
    } = {
      ...this.baseConfig,
      ...config,
      ...controller,
    };

    const promise: any = fetch(url, currentConfig)
      .then((response) => {
        // 299 >= response.status >= 200
        if (response.ok) {
          // 用来处理 json 或者 blob 返回
          return handleResponse && handleResponse(response);
        } else {
          // response.status >= 400
          if (response.status >= 400) {
            if (showNotification) {
              notification.error({
                message: `请求错误 ${response.status}: ${response.url}`,
              });
            }
            throw new Error(`[${response.status}] 请求错误 ${response.url}`);
          } else {
            // 400 > response.status > 200
            handleStatus &&
              handleStatus(
                response.status,
                handleResponse && handleResponse(response),
              );
          }
        }
      })
      .then((standard) => {
        if (standard) {
          return handleData(standard);
        }
      })
      .catch((reason) => {
        if (showNotification) {
          notification.error({ message: `${reason || "未知"}` });
        }

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

// console.log(new URL("http://www.baidu.com"));

console.log(
  queryString.stringifyUrl({
    url: "http://www.baidu.com",
    query: { name: 123, demO: [123, "123"] },
  }),
);

// mode: "cors",
// credentials: "include",
// cache: "no-cache",
