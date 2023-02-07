import { container, injectable } from 'tsyringe';
import { GET } from '../../../packages/VHttp/GET';
import { POST } from 'packages/VHttp/POST';
import { PUT } from 'packages/VHttp/PUT';
import { API } from 'src/core/layouts/public/configs/api.config';
import { DELETE } from 'packages/VHttp/DELETE';

@injectable()
export class BlogServices {
  private _get: GET = container.resolve(GET);
  private _post: POST = container.resolve(POST);
  private _put: PUT = container.resolve(PUT);
  private _delete: DELETE = container.resolve(DELETE);

  postBlogData(data:any) {
    return this._post.setApi(API.blogs)
      .setPayload(data)
      .requestPromise()
  }

  getBlogData(params:any) {
    return this._get.setApi(API.allblogs)
    .setParams(params)
    .requestPromise()
  }

  getBlogPhoto(slug:any) {
    return this._get.setApi(API.blogPhoto + `/${slug}`)
    .requestPromise()
  }

  getBlogDetail(slug:any) {
    return this._get.setApi(API.blogDetail + `/${slug}`)
    .setParams({})
    .requestPromise()
  }
}