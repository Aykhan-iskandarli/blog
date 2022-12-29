// import {IHttpResponse} from '@/packages/VHttp/types/http-response';
import { IHttpResponse } from "../types/http-response";
// import {HttpConfig} from '@/packages/VHttp/configs/http.config';
import { HttpConfig } from "../configs/http.config";

export class HttpResponse {
  data: any;
  headers: any;
  status: number;
  statusText: string | undefined;
  constructor(res: IHttpResponse) {
    this.data = res.data;
    this.status = res.status;
    this.setStatusText(res);
  }

  private setStatusText(res: IHttpResponse) {
    if (res.statusText && res.statusText !== "") {
      this.statusText = res.statusText;
    }
  }
}
// tslint:disable-next-line: max-classes-per-file
export class HttpErrorResponse extends Error {
  readonly name: string = 'HttpErrorResponse';
  status: number | null;
  message: string;
  stack: string | undefined;
  constructor(err: Error) {
    super();
    // @ts-ignore
    this.status = err.response ? err.response.status : null;
    this.message = err.message;
    if (!HttpConfig.SHOWEXCEPTIONSTACK) {
      this.stack = err.stack;
    } else {
      this.stack = undefined;
    }
  }
}
