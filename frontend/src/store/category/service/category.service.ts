import { container, injectable } from 'tsyringe';
import { GET } from '../../../packages/VHttp/GET';
import { POST } from 'packages/VHttp/POST';
import { PUT } from 'packages/VHttp/PUT';
import { API } from 'src/core/layouts/public/configs/api.config';

@injectable()
export class CategoryServices {
  private _get: GET = container.resolve(GET);
  private _post: POST = container.resolve(POST);
  private _put: PUT = container.resolve(PUT);

  getCategoryData() {
    return this._get.setApi(API.categories)
      .requestPromise()
  }
}