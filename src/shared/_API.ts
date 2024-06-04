import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import queryString from "query-string";

type PPromise<T = any> = Promise<T> & {
  cancel: () => void;
};

export interface IAPIConfig extends AxiosRequestConfig {
  showNotification?: boolean;
  // handleOption?: (option: AxiosRequestConfig) => any;
  // handleResp?: (resp: any) => any;
}

// axios#request(config)
// axios#get(url[, config])
// axios#delete(url[, config])
// axios#head(url[, config])
// axios#options(url[, config])
// axios#post(url[, data[, config]])
// axios#put(url[, data[, config]])
// axios#patch(url[, data[, config]])
// axios#getUri([config])

class API {
  public host: string;
  public instance: AxiosInstance;

  public constructor(host: string, baseConfig: IAPIConfig = {}) {
    this.host = host;
    this.instance = axios.create({ baseURL: this.host });

    // this.instance.get
    // this.instance.post
    // this.instance.put
    // this.instance.patch
    // this.instance.delete

    // this.instance.postForm
    // this.instance.putForm
    // this.instance.patchForm

    // this.instance.head
    // this.instance.options
    // this.instance.getUri
  }

  public getJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "get",
      params: data,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }

  public postJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "post",
      data,
    });
  }

  public putJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "put",
      data,
    });
  }

  public patchJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "patch",
      data,
    });
  }

  public deleteJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "delete",
      data,
    });
  }

  // TODO
  public headJSON(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "head",
      data: data,
    });
  }

  public postForm(
    endpoint: string,
    data: FormData | Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "post",
      data: data instanceof FormData ? data : queryString.stringify(data),
    });
  }

  public putForm(
    endpoint: string,
    data: FormData | Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "put",
      data: data instanceof FormData ? data : queryString.stringify(data),
    });
  }

  public patchForm(
    endpoint: string,
    data: FormData | Record<string | number, any> = {},
    config?: IAPIConfig,
  ) {
    return this.request({
      ...config,
      url: endpoint,
      method: "patch",
      data: data instanceof FormData ? data : queryString.stringify(data),
    });
  }

  public getDownloadFile() {}

  public postFile() {}

  public putFile() {}

  public getUri(
    endpoint: string,
    data: Record<string | number, any> = {},
    config?: AxiosRequestConfig,
  ) {
    return this.instance.getUri({
      ...config,
      url: endpoint,
      params: data,
      paramsSerializer: (params) => queryString.stringify(params),
    });
  }

  public jsonp(
    endpoint: string,
    data: Record<string | number, any> = {},
    config: {
      param?: string;
      prefix?: string;
      name?: string;
      timeout?: number;
    } = {},
  ) {
    const uri = this.getUri(endpoint, data);

    const prefix = config.prefix || "__jp";

    const id = config.name || prefix + count++;

    // fetch()

    const param = config.param || "callback";
    const timeout = config.timeout ? config.timeout : 60000;
    // const enc = encodeURIComponent;
    const target = document.getElementsByTagName("script")[0] || document.head;
    // const script;
    // const timer;

    // try {
    //   jsonp(
    //     uri,
    //     { prefix: `__${this.host.replace(/[^\w\d]/g, "")}` },
    //     (error, data) => {
    //       console.log(error);
    //     },
    //   );
    // } catch (error) {
    //   console.log(123);
    // }

    // let cancel;

    // const promise: any = new Promise((resolve, reject) => {
    //   cancel = jsonp(
    //     uri,
    //     { prefix: `__${this.host.replace(/[^\w\d]/g, "")}` },
    //     (error, data) => {
    //       console.log(error);

    //       if (error) return reject(error);
    //       return resolve(data);
    //     },
    //   );
    // });

    // promise.cancel = cancel;

    // return promise as PPromise;
  }

  private request<T>(reqConfig: IAPIConfig) {}
}

// const api = new API("http://www.d123123123123e.com", {});

// api.jsonp("hello");
const target = document.getElementsByTagName("script")[0] || document.head;

const script = document.createElement("script");
script.src = "http://www.de.com/hello";

target.parentNode?.insertBefore(script, target);

script.addEventListener("error", (e) => {
  console.log("error", e);
});

type PWindow = typeof window & { [k: string]: any };

let count = 0;

const jsonp = (
  url: string,
  // callback: (data?: any) => void,
  config: {
    param?: string;
    prefix?: string;
    name?: string;
    timeout?: number;
  } = {},
) => {
  const id = config.name || `${config.prefix}${count++}`;

  const promise = new Promise((resolve, reject) => {
    const callback = (data: any) => {
      resolve(data);
    };

    (window as PWindow)[id] = callback;
  });

  return promise;

  // const cleanup = () => {
  //   if (script.parentNode) script.parentNode.removeChild(script);
  //   // window[id] = noop;
  //   // if (timer) clearTimeout(timer);
  // };

  // const {
  //   param = "callback",
  //   prefix = "__jp",
  //   name = "",
  //   timeout = 60000,
  // } = config;
  // const id = name || prefix + count++;
  // const target = document.getElementsByTagName("script")[0] || document.head;
  // let script: any;
  // let timer: any;
  // if (timeout) {
  //   timer = setTimeout(() => {
  //     cleanup();
  //     if (fn) fn(new Error("Timeout"));
  //   }, timeout);
  // }
  // function cleanup() {
  //   if (script.parentNode) script.parentNode.removeChild(script);
  //   window[id] = noop;
  //   if (timer) clearTimeout(timer);
  // }
  // function cancel() {
  //   if (window[id]) {
  //     cleanup();
  //   }
  // }
};
