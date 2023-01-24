import { ICategoryAndTag } from "../types/category-types";

export class TagModel {
  public name: string | undefined;
  public id: number | string | undefined;
  public createdAt: number | string | undefined;
  public updatedAt: number | string | undefined;
  public slug: string | undefined;
  constructor(item: ICategoryAndTag) {
    this._setId(item);
    this._setName(item);
    this._setSlug(item);
    this._setCreatedAt(item);
    this._setUpdatedAt(item);
  }

  /**
   * set id
   * @param id
   * @private
   */

  private _setId({ _id }: ICategoryAndTag) {
    this.id = _id;
  }

  /**
   * set slug
   * @param slug
   * @private
   */

  private _setSlug({ slug }: ICategoryAndTag) {
    this.slug = slug;
  }


   /**
   * set createdAt
   * @param createdAt
   * @private
   */

   private _setCreatedAt({ createdAt }: ICategoryAndTag) {
    this.createdAt = createdAt;
  }


   /**
   * set updatedAt
   * @param updatedAt
   * @private
   */

   private _setUpdatedAt({ updatedAt }: ICategoryAndTag) {
    this.updatedAt = updatedAt;
  }

  /**
   * set name
   * @param name
   * @private
   */

  private _setName({ name }: ICategoryAndTag) {
    this.name = name;
  }
}
