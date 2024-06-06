import { notification } from "antd";
import queryString from "query-string";
import { pick } from "ramda";

interface IPowerfulConfig {
  showNotification?: boolean;
  handleOk?: (response: Response) => Promise<any>;
  handleNotOk?: (status: number, response: Response) => any;
  handleData?: (data: any) => any;
}

type IAPIConfig = IPowerfulConfig & RequestInit;

interface IJsonpConfig {
  showNotification?: boolean;
  handleData?: (data: any) => any;

  param?: string;
  prefix?: string;
  name?: string;
  timeout?: number;
}

type IPromise<T = any> = Promise<T> & {
  cancel: () => void;
};

type IWindow = typeof window & { [k: string]: any };

// TODO 上传文件，上传大文件
class API {
  private static jsonpCount = 0;

  // response.text()：得到文本字符串。
  // response.json()：得到 JSON 对象。
  // response.blob()：得到二进制 Blob 对象。
  // response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
  // Service Worker
  // response.formData()：得到 FormData 表单对象。

  public static handleJson(response: Response) {
    return response.json();
  }

  public static async handleBlob(response: Response) {
    const blob = await response.blob();

    const objectUrl = URL.createObjectURL(blob);
    const uuidUrl = objectUrl.toString();
    let filename = uuidUrl.substring(uuidUrl.lastIndexOf("/") + 1);
    URL.revokeObjectURL(objectUrl);

    const contentDisposition = response.headers.get("content-disposition");

    if (contentDisposition) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches =
        contentDisposition && filenameRegex.exec(contentDisposition);
      if (matches !== null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
        filename = decodeURIComponent(filename);
      }
    }

    return { blob, filename };
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
    return this.request<T>(this.formatEndpoint(endpoint, data), {
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
    headers.append("content-type", "application/json;charset=utf-8");
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
    headers.append("content-type", "application/json;charset=utf-8");
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
    headers.append("content-type", "application/json;charset=utf-8");
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
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "delete",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  // TODO 应该只返回 header，需要验证
  public headJson<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "head",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      ...config,
    });
  }

  public getBlob(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    return this.request<{ blob: Blob; filename: string }>(
      this.formatEndpoint(endpoint, data),
      {
        method: "get",
        handleOk: API.handleBlob,
        handleData: (blob) => blob,
        ...config,
      },
    );
  }

  public postBlob(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<{ blob: Blob; filename: string }>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      handleData: (blob) => blob,
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

  public formatUrl(endpoint: string, data: Record<string | number, any> = {}) {
    const _endpoint = this.formatEndpoint(endpoint, data);
    return new URL(_endpoint, this.hostURL);
  }

  public request<T>(endpoint: string, config: IAPIConfig) {
    const url = this.formatUrl(endpoint);
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
      keepalive: true,
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
      controller.abort("取消请求");
    };

    return promise as IPromise<T>;
  }

  public jsonp<T = any>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IJsonpConfig = {},
  ) {
    const {
      showNotification = true,
      handleData = API.handleData,
      ...currentConfig
    } = {
      ...pick(["showNotification", "handleData"], this.baseConfig),
      ...config,
    };

    const prefix = currentConfig.prefix || "__jp__";
    const id = currentConfig.name || `${prefix}${API.jsonpCount++}`;
    const param = currentConfig.param || "callback";

    const _url = this.formatUrl(endpoint, data);
    _url.searchParams.append(param, id);
    const url = _url.toString();

    const timeout = currentConfig.timeout ? currentConfig.timeout : 60000;
    let timer: NodeJS.Timeout;

    const _window: IWindow = window;
    const target = document.getElementsByTagName("script")[0] || document.head;
    const script = document.createElement("script");

    const controller = new AbortController();

    const noop = () => {};

    let handleError: (e: ErrorEvent) => void;

    const cleanup = () => {
      script.removeEventListener("error", handleError);
      script.parentNode!.removeChild(script);
      _window[id] = noop;
      if (timer) clearTimeout(timer);
    };

    const promise: any = new Promise<T>((resolve, reject) => {
      _window[id] = (data: any) => {
        resolve(data);
        cleanup();
      };

      handleError = (e: ErrorEvent) => {
        cleanup();
        reject(new Error(`[请求失败] ${url}`));
      };

      if (timeout) {
        timer = setTimeout(() => {
          cleanup();
          reject(new Error(`[请求超时] ${url}`));
        }, timeout);
      }

      script.src = url;
      script.addEventListener("error", handleError, {
        signal: controller.signal,
      });
      target.parentNode!.insertBefore(script, target);
    })
      .then((data) => (handleData ? handleData(data) : data))
      .catch((reason) => {
        showNotification &&
          notification.error({ message: `${reason || "未知"}` });
        throw new Error(`请求失败 ${reason}`);
      });

    promise.cancel = () => {
      cleanup();
      controller.abort("取消请求");
    };

    return promise as IPromise<T>;
  }

  private formatEndpoint(
    endpoint: string,
    data: Record<string | number, any> = {},
  ) {
    const queryStr = queryString.stringify(data);
    return queryStr ? `${endpoint}?${queryStr}` : endpoint;
  }
}

export default API;

export const createAPI = (host: string, config: IAPIConfig = {}) =>
  new API(host, config);
