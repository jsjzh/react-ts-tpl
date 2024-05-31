import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import queryString from "query-string";

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
  public instance: AxiosInstance;

  public constructor(baseURL: string, baseConfig: IAPIConfig) {
    this.instance = axios.create({ baseURL });

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

  public jsonp() {}

  private request<T>(reqConfig: IAPIConfig) {}
}
