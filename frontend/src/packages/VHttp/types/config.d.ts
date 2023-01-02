/**
 * Configuration for XML HTTP Requests
 */
export interface IHttpConfig {
  /**
   * WithCredentials
   * @description `withCredentials` indicates whether or not cross-site Access-Control requests
   * @desc should be made using credentials
   * @type boolean
   */
  withCredentials?: boolean;
  /**
   * Timeout
   * @description `timeout` specifies the number of milliseconds before the request times out.
   * @desc If the request takes longer than `timeout`, the request will be aborted.
   * @desc default is `0` (no timeout)
   * @type: number
   */
  timeout?: number;
  /**
   *  Response Type of Request
   *  @description `responseType` indicates the type of data that the server will respond with
   *  @type 'arraybuffer' | 'document' | 'json' | 'text' | 'stream'
   */
  responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';
  /**
   * XSRF TOKEN for cookie
   * @description `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
   * @type 'XSRF-TOKEN' | string'
   */
  xsrfCookieName?: 'XSRF-TOKEN' | string;
  /**
   * XSRF TOKEN for header
   * @description `xsrfHeaderName` is the name of the http header that carries the xsrf token value
   * @type 'X-XSRF-TOKEN' | string'
   */
  xsrfHeaderName?: 'X-XSRF-TOKEN' | string;
  /**
   * Upload Event Handler
   * @description `onUploadProgress` allows handling of progress events for uploads
   * @param progressEvent: ProgressEvent
   * @callback
   */
  onUploadProgress?: (progressEvent: ProgressEvent) => callback;
  /**
   * Download Event Handler
   * @description `onDownloadProgress` allows handling of progress events for downloads
   * @param progressEvent: ProgressEvent
   * @callback
   */
  onDownloadProgress?: (progressEvent: ProgressEvent) => callback;
  /**
   * Validate response status
   * @description `validateStatus` defines whether to resolve or reject the promise for a given
   * @desc HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
   * or `undefined`), the promise will be resolved; otherwise, the promise will be rejected.
   * @param status: number;
   * @callback
   */
  valideStatus?: (status: number) => callback;
  /**
   * Authenticator
   * @description `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
   * @desc This will set an `Authorization` header, overwriting any existing
   * `Authorization` custom headers you have set using `headers`.
   * Please note that only HTTP Basic auth is configurable through this parameter.
   * For Bearer tokens and such, use `Authorization` custom headers instead.
   * @type HTTPAuth
   */
  auth?: HTTPAuth;
}
interface HTTPAuth {
  username: string;
  password: string;
}
