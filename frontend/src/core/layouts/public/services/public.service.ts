import { POST } from "packages/VHttp/POST";
import { container, injectable } from "tsyringe";
import { API } from "../configs/api.config";

@injectable()
export class Auth {
  private _post: POST = container.resolve(POST);
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
}
