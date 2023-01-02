import {HTTP} from './http';
import {ExceptionMessages} from './exceptions/exception.messages';
import {IHttpConfig} from './types/config';
import {Observable, of, throwError, from} from 'rxjs';
import {injectable} from 'tsyringe';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from './models/http.model';

@injectable()
export class PATCH extends HTTP {
  private readonly method = 'patch';
  constructor() {
    super();
  }

  /**
   * Set URL of ApiConfig
   * @description Sets URL of ApiConfig Call.
   * @param url: string
   * @returns this
   */
  public setApi(url: string): this {
    return super.setApi(url);
  }

  /**
   * Get URL of ApiConfig
   * @returns string;
   * @protected
   */
  protected getApi(): string {
    const api = super.getApi();
    if (!api) {
      console.warn(ExceptionMessages.SETAPI);
    }
    return api ? api : '/';
  }

  /**
   * Set Configs for HTTP Call
   * @param params: IHttpConfig
   * @returns this
   */
  public setConfigs(params: IHttpConfig): this {
    return super.setConfigs(params);
  }

  /**
   * Get Config data http call
   * @returns IHttpConfig
   * @protected
   */
  protected getConfigs(): IHttpConfig {
    return super.getConfigs();
  }

  /**
   * Set Headers for HTTP Call
   * @param headers
   * @returns this
   */
  public setHeaders(headers: any): this {
    return super.setHeaders(headers);
  }

  /**
   * Get Headers for HTTP Call
   * @returns Headers which set earlier with `setHeaders()` method
   * @protected
   */
  protected getHeaders(): any {
    return super.getHeaders();
  }
  /**
   * Set Query Parameters to HTTP Call
   * @param params
   * @returns this
   */
  public setParams(params: any): this {
    return super.setParams(params);
  }

  /**
   * Get Query Parameters for Http Call which filled earlier
   * @protected
   */
  protected getParams(): any {
    return super.getParams();
  }
  /**
   * Set Request Payload
   * @param params
   * @returns this
   */
  public setPayload(payload: any): this {
    return super.setPayload(payload);
  }

  /**
   * Get Request Payload
   * @protected
   */
  protected getPayload(): any {
    return super.getPayload();
  }

  /**
   * Make Request
   * @description Returns Response with Observable
   * @returns Observable
   */
  public request(id?: string | number): Observable<HttpResponse> {
    return from(this.populateRequest(id)).pipe(
      map(res => new HttpResponse(res)),
      catchError((err: Error) => throwError(new HttpErrorResponse(err))),
    );
  }

  /**
   * Make Request
   * @description Returns Response with Promise
   * @returns Promise
   */
  public requestPromise(id?: number | string): Promise<any> {
    return this.populateRequest(id);
  }

  /**
   * Populate Request and send
   * @returns Promise
   * @private
   */
  private populateRequest(id?: number | string): Promise<any> {
    return this.makeRequest({
      method: this.method,
      url: this.getApi() + (id ? '/' + id : ''),
      params: this.getParams(),
      data: this.getPayload(),
      headers: this.getHeaders(),
      ...this.getConfigs(),
    });
  }
}
