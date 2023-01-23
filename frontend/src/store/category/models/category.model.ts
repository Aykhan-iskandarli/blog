import { ICategory } from "../types/category-types";

export class CategoryModel {
  public name: string | undefined;
  public id: number | string | undefined;
  public createdAt: number | string | undefined;
  public updatedAt: number | string | undefined;
  public slug: string | undefined;
  constructor(item: ICategory) {
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

  private _setId({ id }: ICategory) {
    this.id = id;
  }

  /**
   * set slug
   * @param slug
   * @private
   */

  private _setSlug({ slug }: ICategory) {
    this.slug = slug;
  }


   /**
   * set createdAt
   * @param createdAt
   * @private
   */

   private _setCreatedAt({ createdAt }: ICategory) {
    this.createdAt = createdAt;
  }


   /**
   * set updatedAt
   * @param updatedAt
   * @private
   */

   private _setUpdatedAt({ updatedAt }: ICategory) {
    this.updatedAt = updatedAt;
  }

  /**
   * set name
   * @param name
   * @private
   */

  private _setName({ name }: ICategory) {
    this.name = name;
  }
}
