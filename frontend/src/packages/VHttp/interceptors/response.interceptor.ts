// import {HTTP} from '@/packages/VHttp/http';
import {HTTP} from '../http';
export abstract class ResponseInterceptor extends HTTP {
  interceptor() {
    return this.makeRequest.interceptors.response;
  }
}
