import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import qs from "query-string";
import JSONP from "jsonp";
import ExtendableError from "./error";
import { notification } from "antd";
import queryString from "query-string";

class APIError extends ExtendableError {
  public constructor(message = "") {
    super(message);
  }
}

type IRequestConfig = AxiosRequestConfig & {
  /**
   * 在请求发生错误时，是否右上角弹出错误提示
   */
  showNotification?: boolean;
  /**
   * 请求设置处理函数，可以使用这个参数统一处理请求设置
   * 比如我希望我所有的请求都加上一个自定义的请求头：
   *
   * ```js
   * const api = createAPI(HOST, {
   *   handleOption: (option) => {
   *     option.headers = {
   *        ...option.headers,
   *        ['Custom-Request-Header']: 666,
   *     };
   *   },
   * })
   * ```
   */
  handleOption?: (option: AxiosRequestConfig) => any;
  /**
   * 设置如何处理返回结果
   * 默认把返回结果的 data 字段返回
   */
  handleResp?: (resp: any) => any;
};

const VALID_IP_REGEXP =
  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/;
const VALID_HOST_REGEXP =
  /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])/;

export const getAPIPrefix = (str: string) => {
  let val = str || "/";
  if (typeof val === "string") {
    if (/^https?:/.test(val)) {
      val = val.replace(/^(https?:)/, protocol);
    } else {
      if (VALID_IP_REGEXP.test(val) || VALID_HOST_REGEXP.test(val)) {
        val = `${protocol}\/\/${val}`;
      } else {
        val = val.replace(/^([^/.])/, "/$1");
      }
    }
    val = val.replace(/([^/])$/, "$1/");
  }
  return val;
};

export const getAPIUrl = (prefix: string, endpoint: string) => {
  const url = `${prefix}/${endpoint}`;
  const re = new RegExp(
    `/+(${endpoint.replace(/^\/+/, "").replace(/\?.*$/, "")})`,
  );
  return url.replace(re, "/$1");
};

const noop = () => {};

const { protocol } = window.location;
const { CancelToken } = axios;

/**
 * 传入 API 接口的 host 地址，生成一个 API 实例，你可以用这个实例去进行各种 CURD 请求
 *
 * ```js
 * const api = createAPI(HOST);
 * const fetchData = async () => {
 *   const data = await api.getJSON('/orders'); // 发起 GET 请求
 *   console.log(data);
 * }
 * ```
 *
 * 默认 createAPI 会返回 `{success: true, data: {...}, code: xxx, msg: xxx}`
 * 中的 data 字段，如果你想要判断接口返回是否成功，可以在 catch 里进行逻辑判断
 * ```js
 * const update = (data) => {
 *   api
 *     .postJSON('/orders', data)
 *     .then((resp) => {
 *       // 请求成功
 *     })
 *     .catch((err) => {
 *       // 请求失败
 *     })
 * }
 * ```
 *
 * @param {string} host 接口 host
 * @param {IRequestConfig} apiConfig 接口请求设置
 */
const createAPI = (host: string, apiConfig: IRequestConfig = {}) => {
  const prefix = getAPIPrefix(host);
  type IRequestResult<T> = Promise<T> & {
    promise: Promise<T>;
    cancel: () => void;
  };
  function request<T>(
    endpoint: string,
    reqConfig: IRequestConfig = {},
  ): IRequestResult<T> {
    const config = { ...apiConfig, ...reqConfig };
    const {
      showNotification = true,
      handleOption,
      handleResp = (resp: any) => resp.data,
      ...reqOpts
    } = config;
    const url = getAPIUrl(prefix, endpoint);
    let cancel = noop;
    let opts: AxiosRequestConfig = {
      withCredentials: true,
      cancelToken: new CancelToken((c) => (cancel = c)),
      paramsSerializer: (params) => queryString.stringify(params),
      ...reqOpts,
    };

    if (handleOption) {
      opts = handleOption(opts) || opts;
    }

    const promise: IRequestResult<T> = axios(url, opts)
      .then(checkStatus)
      .then((resp) => handleResp(resp))
      .then(chekcResp)
      .catch((err) => {
        console.log(err);

        if (axios.isCancel(err)) {
          console.warn(`请求取消：${endpoint}`);
          return;
        }

        throw err;
      }) as any;

    promise.promise = promise;
    promise.cancel = cancel;

    return promise;

    function checkStatus(resp: AxiosResponse) {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }

      if (showNotification) {
        notification.error({
          message: `请求错误 ${resp.status}: ${resp.config.url}`,
          description: resp.data
            ? resp.data.error || resp.data.msg
            : resp.status,
        });
      }

      throw new APIError(`[${resp.status}] 请求错误 ${resp.config.url}`);
    }

    function chekcResp(data: any) {
      if (data.data && data.headers && data.config && data.request) {
        return data;
      }

      if (data instanceof Blob) {
        return data;
      }

      if (data.success) {
        return data.data;
      }

      if (Number(data.code) === 401) {
        window.location.href = `${window.location.origin}${window.location.pathname}`;
      }

      if (showNotification) {
        notification.error({ message: `${data.msg || "未知"}` });
      }

      throw new APIError(`[${data.code}] 请求失败 ${data.msg}`);
    }
  }

  /**
   * 发起 GET 请求
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */
  function getJSON<T = any>(
    endpoint: string,
    data: Record<string, string | number | any> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, { ...config, method: "get", params: data });
  }

  /**
   * 发起 GET 请求
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */
  function getFile<T = Blob>(
    endpoint: string,
    fileName: string,
    data: Record<string, string | number | any> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, {
      ...config,
      responseType: "blob",
      method: "get",
      timeout: 5 * 60 * 1e3,
      handleResp: (resp) => resp,
      params: data,
    }).then((resp: any) => {
      const contentDisposition = resp.headers["content-disposition"];
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      let realFileName = fileName;

      if (matches !== null && matches[1]) {
        realFileName = matches[1].replace(/['"]/g, "");
        realFileName = decodeURIComponent(realFileName);
      }

      try {
        const aElement = document.createElement("a");
        document.body.appendChild(aElement);
        aElement.setAttribute("download", fileName);
        const href = URL.createObjectURL(resp.data);
        aElement.href = href;
        aElement.click();
        URL.revokeObjectURL(href);
        document.body.removeChild(aElement);
      } catch (error) {
        throw new APIError("下载文件时发生错误");
      }

      return true;
    });
  }

  /**
   * 发起 POST 请求
   *
   * @param {string} endpoint
   * @param {Record<string, string | number | any>} data
   * @param {IRequestConfig} config
   */
  function postJSON<T = any>(
    endpoint: string,
    data: Record<string, string | number | any> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, { ...config, method: "post", data });
  }

  /**
   * 以表单形式发起 post 请求，通常用来上传文件
   *
   * 如何使用 postForm 上传文件：
   *
   * ```js
   * const input = document.createElement('input');
   * input.type = 'file';
   * input.click();
   * input.addEventListener('change', () => {
   *   // file 对象代表你从浏览器里选取的文件对象，获取 file 对象的形式多种多样，你也可以使用 antd Upload 组件获取 file 对象
   *   const file = input.files[0];
   *   const formData = new FormData();
   *   formData.append('file', file);
   *   api.postForm('upload', formData);
   * });
   * ```
   *
   * @param {string} endpoint
   * @param {FormData | Record<string, string | number>} data
   * @param {IRequestConfig} config
   */
  function postForm<T = any>(
    endpoint: string,
    data: FormData | Record<string, string | number> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, {
      ...config,
      method: "post",
      data: data instanceof FormData ? data : qs.stringify(data),
    });
  }

  function putForm<T = any>(
    endpoint: string,
    data: FormData | Record<string, string | number> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, {
      ...config,
      method: "put",
      data: data instanceof FormData ? data : qs.stringify(data),
    });
  }

  /**
   *
   * @param {string} endpoint
   * @param {Record<string, File>} files
   * @param {IRequestConfig} config
   */
  function postFile<T = any>(
    endpoint: string,
    files: Record<string, File>,
    config?: IRequestConfig,
  ) {
    const isFile = (f: any) =>
      Object.prototype.toString.call(f) === "[object File]";
    const fd = new FormData();
    Object.keys(files).forEach((k: string) => {
      if (!isFile(files[k]))
        throw new Error("postFile 方法只接受值为 File 对象的键值对作为参数！");
      fd.append(k, files[k]);
    });
    return postForm<T>(endpoint, fd, config);
  }

  /**
   *
   * @param {string} endpoint
   * @param {Record<string, File>} files
   * @param {IRequestConfig} config
   */
  function putFile<T = any>(
    endpoint: string,
    files: Record<string, File>,
    config?: IRequestConfig,
  ) {
    const isFile = (f: any) =>
      Object.prototype.toString.call(f) === "[object File]";
    const fd = new FormData();
    Object.keys(files).forEach((k: string) => {
      if (!isFile(files[k]))
        throw new Error("putFile 方法只接受值为 File 对象的键值对作为参数！");
      fd.append(k, files[k]);
    });
    return putForm<T>(endpoint, fd, config);
  }

  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number | any>} data
   * @param {IRequestConfig} config
   */
  function putJSON<T = any>(
    endpoint: string,
    data: Record<string, string | number | any> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, { ...config, method: "put", data });
  }

  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */
  function patchJSON<T = any>(
    endpoint: string,
    data: Record<string, string | number> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, { ...config, method: "patch", data });
  }

  /**
   *
   * @param {string} endpoint
   * @param {Record<string, string | number>} data
   * @param {IRequestConfig} config
   */
  function deleteJSON<T = any>(
    endpoint: string,
    data: Record<string, string | number> = {},
    config?: IRequestConfig,
  ) {
    return request<T>(endpoint, { ...config, method: "delete", data });
  }

  function jsonp<T = any>(
    endpoint: string,
    params: Record<string, string | number> = {},
    config: Omit<
      IRequestConfig,
      keyof AxiosRequestConfig | "handleOption"
    > = {},
  ): Promise<T> {
    const { handleResp = (resp: any) => resp.data } = config;
    return new Promise((resolve, reject) => {
      let url = `${protocol}//${host}/${endpoint}`;
      if (params) url += `?${qs.stringify(params)}`;
      JSONP(
        url,
        { prefix: `__${host.replace(/[^\w\d]/g, "")}` },
        (err: null | Error, resp: any) => {
          if (err) return reject(err);
          if (!resp.success) {
            return reject(new APIError(`[${resp.code}] 请求失败 ${resp.msg}`));
          }
          resolve(handleResp(resp));
        },
      );
    });
  }

  /**
   * 获取 API 接口 url
   *
   * @param {string} endpoint
   */
  function resovleUrl(endpoint: string) {
    return getAPIUrl(prefix, endpoint);
  }

  function createGetUrl(
    endpoint: string,
    data: Record<string, string | number | any> = {},
  ) {
    return `${getAPIUrl(prefix, endpoint)}?${qs.stringify(data)}`;
  }

  return {
    resovleUrl,
    request,
    getJSON,
    getFile,
    postJSON,
    postForm,
    putForm,
    postFile,
    putFile,
    putJSON,
    patchJSON,
    deleteJSON,
    jsonp,
    createGetUrl,
  };
};

export default createAPI;
