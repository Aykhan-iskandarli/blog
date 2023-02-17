import { IBlogById } from "../types/blog";

export class BlogByIdModel {
  public title: string | undefined;
  public id: number | string | undefined;
  public categories: string | undefined;
  public tags: string | undefined;
  public body: string | undefined;
  constructor(item: IBlogById) {
    this._setId(item);
    this._setTitle(item);
    this._setBody(item);
    this._setCategories(item);
    this._setTags(item);
  }

  /**
   * set id
   * @param id
   * @private
   */

  private _setId({ _id }: IBlogById) {
    this.id = _id;
  }

  /**
   * set title
   * @param title
   * @private
   */

  private _setTitle({ title }: IBlogById) {
    this.title = title;
  }


   /**
   * set categories
   * @param categories
   * @private
   */

   private _setCategories({ categories }: IBlogById) {
    const helperArr:any = []
    categories?.map((cat:any)=>(
        helperArr.push({
            title: cat.name,
            titleId: cat._id
        })
    ))
    this.categories = helperArr;
  }

 /**
   * set tags
   * @param tags
   * @private
   */

 private _setTags({ tags }: IBlogById) {
    const helperArr:any = []
    tags?.map((tag:any)=>(
        helperArr.push({
          title: tag.name,
          titleId: tag._id
        })
    ))

    this.tags = helperArr;
  }


  /**
   * set body
   * @param body
   * @private
   */

  private _setBody({ body }: IBlogById) {
    this.body = body;
  }
}
