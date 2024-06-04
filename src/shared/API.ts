import { notification } from "antd";
import queryString from "query-string";

interface IAPIConfig extends RequestInit {
  showNotification?: boolean;
  handleResponse?: (response: Response) => any;
  handleData?: (data: any) => any;
  handleStatus?: (status: number, data: any) => any;
}

type PPromise<T = any> = Promise<T> & {
  cancel: () => void;
};

class API {
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
    return this.request(`${endpoint}?${queryStr}`, { method: "get", headers });
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
    });
  }

  public putForm(endpoint: string, data: FormData, config: IAPIConfig = {}) {
    const headers = new Headers();
    // multipart/form-data
    headers.append("content-type", "application/json");
    return this.request(endpoint, {
      method: "put",
      headers,
      // data: data instanceof FormData ? data : queryString.stringify(data),
      body: data,
    });
  }

  public downloadFile() {}

  public request<T>(endpoint: string, config: IAPIConfig) {
    const url = new URL(endpoint, this.hostURL);
    const controller = new AbortController();

    const {
      showNotification,
      // TODO
      handleResponse = API.handleJson,
      handleStatus,
      handleData = (standard: any) => standard.data,
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
      // headers: {},
      ...currentConfig,
    })
      .then((response) => {
        // 299 >= response.status >= 200
        if (response.ok) {
          // 用来处理 json 或者 blob 返回
          return handleResponse(response);
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
              handleStatus(response.status, handleResponse(response));
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

    return promise as PPromise<T>;
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
