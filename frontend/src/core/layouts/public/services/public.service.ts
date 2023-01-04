import { GET } from "packages/VHttp/GET";
import { POST } from "packages/VHttp/POST";
import { container, injectable } from "tsyringe";
import { API } from "../configs/api.config";

@injectable()
export class Auth {
  private _post: POST = container.resolve(POST);
  private _get: GET = container.resolve(GET);
  register(data: any): Promise<any> {
    return this._post.setApi(API.register)
        .setPayload(data)
        .requestPromise()
}
login(data: any): Promise<any> {
  return this._post.setApi(API.login)
      .setPayload(data)
      .requestPromise()
}
logout(): Promise<any> {
  return this._get.setApi(API.logout)
      .requestPromise()
}
}
