import axios from 'axios';
import {IHttpConfig} from './types/config';

export abstract class HTTP {
  protected makeRequest = axios;
  private url: string | null = null;
  private params: any | null = null;
  private headers: any | null = null;
  private configs: IHttpConfig | null = null;
  private body: any | null = null;
  protected constructor() {
  }
  protected setApi(url: string): this {
    this.url = url;
    return this;
  }
  protected getApi(): string | null {
    return this.url;
  }
  protected setPayload(payload: any): this {
    this.body = payload;
    return this;
  }
  protected getPayload(): any | null {
    return this.body;
  }
  protected setHeaders(headers: any): this {
    this.headers = headers;
    return this;
  }
  protected getHeaders(): any | null {
    return this.headers;
  }
  protected setParams(params: any): this {
    this.params = params;
    return this;
  }
  protected getParams(): any | null {
    return this.params;
  }
  protected setConfigs(params: IHttpConfig): this {
    this.configs = params;
    return this;
  }
  protected getConfigs(): any | null {
    return this.configs;
  }
}
