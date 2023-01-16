import { ICategory } from "../types/category-types";

export class RolesModel {
  public name: string | undefined;
  public id: number | string |  undefined;
  constructor(item: ICategory) {
    this._setId(item);
    this._setName(item);
  }

   /**
   * set id
   * @param id
   * @private
   */

  private _setId({id}: ICategory) {
    this.id = id;
  }

   /**
   * set name
   * @param name
   * @private
   */

  private _setName({name}: ICategory) {
    this.name = name;
  }


}