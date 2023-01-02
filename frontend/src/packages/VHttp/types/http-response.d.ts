export interface IHttpResponse {
  config: ResponseConfig;
  data: any;
  headers: any;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}
export interface ResponseConfig {
  adapter: {xhrAdapter(config: any): callback};
  data: any | null;
  headers: Object;
  maxBodyLength: number;
  macContentLength: number;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';
  params: Object | null;
  timeout: number;
  url: string;
  validateStatus : {validateStatus(status: number): callback};
  xsrfCookieName: 'XSRF-TOKEN' | string;
  xsrfHeaderName: 'X-XSRF-TOKEN' | string;
}
