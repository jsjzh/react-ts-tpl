import { notification } from "antd";
import queryString from "query-string";
import ExtendableError from "./error";

type AnyObject = Record<string | number, any>;

type IPromise<T = AnyObject> = Promise<T> & {
  cancel: () => void;
};

type IWindow = typeof window & AnyObject;

type BlobReq = AnyObject & { files: Record<string, File> };

type BlobResp = { blob: Blob; filename: string };

class APIError extends ExtendableError {
  public constructor(message = "") {
    super(message);
  }
}

interface IPowerfulConfig {
  showNotification?: boolean;
  handleOk?: (response: Response) => Promise<any> | any;
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

// TODO 上传大文件，一般会做分片上传
// 但这需要和后端协商，定一个上传协议
export class API {
  private static jsonpCount = 0;

  // response.text()：得到文本字符串。
  // response.json()：得到 JSON 对象。
  // response.blob()：得到二进制 Blob 对象。
  // response.arrayBuffer()：得到二进制 ArrayBuffer 对象。
  // Service Worker
  // response.formData()：得到 FormData 表单对象。

  public static async handleJson(response: Response) {
    if (response.redirected) {
      location.href = response.url;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new APIError(`[解析失败] ${response.url}`);
    }
  }

  public static handleHead(response: Response) {
    const headers: { [k: string]: string } = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return headers;
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
      throw new APIError(`[${status}] ${response.url}`);
    }
    return response.json();
  }

  public static handleJsonData(data: any) {
    return data.data;
  }

  public static handleBlobData(blob: any) {
    return blob;
  }

  public hostURL: URL;
  public baseConfig: IAPIConfig;

  public constructor(host: string | URL, config: IAPIConfig) {
    this.hostURL = host instanceof URL ? host : new URL(host);
    this.baseConfig = config;
  }

  public getJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.getJsonForJson<T>(endpoint, data, config);
  }
  public postJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.postJsonForJson<T>(endpoint, data, config);
  }
  public putJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.putJsonForJson<T>(endpoint, data, config);
  }
  public deleteJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.deleteJsonForJson<T>(endpoint, data, config);
  }
  public getBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.getJsonForBlob<T>(endpoint, data, config);
  }
  public postBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.postJsonForBlob<T>(endpoint, data, config);
  }
  public uploadBlob<T = AnyObject>(
    endpoint: string,
    data: BlobReq,
    method: "post" | "put" | "patch" | "delete" = "post",
    config: IAPIConfig = {},
  ) {
    return method === "put"
      ? this.putBlobForJson<T>(endpoint, data, config)
      : method === "patch"
      ? this.patchBlobForJson<T>(endpoint, data, config)
      : method === "delete"
      ? this.deleteBlobForJson<T>(endpoint, data, config)
      : method === "post"
      ? this.postBlobForJson<T>(endpoint, data, config)
      : this.postBlobForJson<T>(endpoint, data, config);
  }

  public headJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.request<T>(this.formatEndpoint(endpoint, data), {
      method: "head",
      handleOk: API.handleHead,
      handleNotOk: API.handleStatus,
      handleData: (header) => header,
      ...config,
    });
  }

  public getJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.request<T>(this.formatEndpoint(endpoint, data), {
      method: "get",
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public getJsonForBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    return this.request<T>(this.formatEndpoint(endpoint, data), {
      method: "get",
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }

  public postJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public postJsonForBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }
  public postBlobForJson<T = AnyObject>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "post",
      body: fd,
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public postBlobForBlob<T = BlobResp>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "post",
      body: fd,
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }

  public putJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "put",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public putJsonForBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "put",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }
  public putBlobForJson<T = AnyObject>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "put",
      body: fd,
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public putBlobForBlob<T = BlobResp>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "put",
      body: fd,
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }

  public patchJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "patch",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public patchJsonForBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "patch",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }
  public patchBlobForJson<T = AnyObject>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "patch",
      body: fd,
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public patchBlobForBlob<T = BlobResp>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "patch",
      body: fd,
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }

  public deleteJsonForJson<T = AnyObject>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "delete",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public deleteJsonForBlob<T = BlobResp>(
    endpoint: string,
    data: AnyObject = {},
    config: IAPIConfig = {},
  ) {
    const headers = new Headers();
    headers.append("content-type", "application/json;charset=utf-8");
    return this.request<T>(endpoint, {
      method: "post",
      headers,
      body: JSON.stringify(data),
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }
  public deleteBlobForJson<T = AnyObject>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "delete",
      body: fd,
      handleOk: API.handleJson,
      handleNotOk: API.handleStatus,
      handleData: API.handleJsonData,
      ...config,
    });
  }
  public deleteBlobForBlob<T = BlobResp>(
    endpoint: string,
    data: BlobReq,
    config: IAPIConfig = {},
  ) {
    const fd = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "files") {
        Object.keys(data.files).forEach((key) =>
          fd.append(key, data.files[key], data.files[key].name),
        );
      } else {
        fd.append(key, data[key]);
      }
    });

    return this.request<T>(endpoint, {
      method: "delete",
      body: fd,
      handleOk: API.handleBlob,
      handleNotOk: API.handleStatus,
      handleData: API.handleBlobData,
      ...config,
    });
  }

  public jsonp<T = AnyObject>(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: IJsonpConfig = {},
  ) {
    const { showNotification = true, handleData = API.handleJsonData } =
      this.baseConfig;

    const prefix = config.prefix || "__jp__";
    const id = config.name || `${prefix}${API.jsonpCount++}`;
    const param = config.param || "callback";

    const _url = this.formatUrl(endpoint, data);
    _url.searchParams.append(param, id);
    const url = _url.toString();

    const timeout = config.timeout ? config.timeout : 30000;
    let timer: number;

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
        reject(new APIError(`[请求失败] ${url}`));
      };

      if (timeout) {
        timer = setTimeout(() => {
          cleanup();
          reject(new APIError(`[请求超时] ${url}`));
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
        throw new APIError(`${reason || "未知"}`);
      });

    promise.cancel = () => {
      cleanup();
      controller.abort("[取消请求]");
    };

    return promise as IPromise<T>;
  }

  public request<T>(endpoint: string, config: IAPIConfig) {
    const url = this.formatUrl(endpoint);
    const controller = new AbortController();

    const {
      showNotification = true,
      handleOk = API.handleJson,
      handleNotOk = API.handleStatus,
      handleData = API.handleJsonData,
      timeout = 30000,
      ...currentConfig
    } = {
      ...this.baseConfig,
      ...config,
    };

    const promise: any = fetch(url, {
      mode: "cors",
      credentials: "include",
      cache: "no-cache",
      keepalive: true,
      signal: controller.signal,
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
        throw new APIError(`${reason || "未知"}`);
      });

    const id = setTimeout(() => {
      controller.abort("[请求超时]");
      clearTimeout(id);
    }, timeout);

    promise.cancel = () => {
      controller.abort("[取消请求]");
    };

    return promise as IPromise<T>;
  }

  public formatUrl(endpoint: string, data: Record<string | number, any> = {}) {
    const _endpoint = this.formatEndpoint(endpoint, data);
    return new URL(_endpoint, this.hostURL);
  }

  private formatEndpoint(
    endpoint: string,
    data: Record<string | number, any> = {},
  ) {
    const queryStr = queryString.stringify(data);
    return queryStr ? `${endpoint}?${queryStr}` : endpoint;
  }
}

const createAPI = (host: string | URL, config: IAPIConfig = {}) =>
  new API(host, config);

export default createAPI;
