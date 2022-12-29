import {HTTP} from '../http';
export abstract class RequestInterceptor extends HTTP {
  public intercept() {
    return this.makeRequest.interceptors.request;
  }
}
