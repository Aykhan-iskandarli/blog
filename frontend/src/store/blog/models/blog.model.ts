import { IBlog } from "../types/blog";

export class BlogModel {
  public title: string | undefined;
  public id: number | string | undefined;
  public categories: string | undefined | null=null;
  public tags: string | undefined;
  public slug: string | undefined;
  public postedBy: object | undefined | null=null;
  constructor(item: IBlog) {
    this._setId(item);
    this._setName(item);
    this._setSlug(item);
    this._setCategories(item);
    this._setTags(item);
    this._setPostedBy(item);
  }

  /**
   * set id
   * @param id
   * @private
   */

  private _setId({ _id }: IBlog) {
    this.id = _id;
  }

  /**
   * set slug
   * @param slug
   * @private
   */

  private _setSlug({ slug }: IBlog) {
    this.slug = slug;
  }


   /**
   * set categories
   * @param categories
   * @private
   */

   private _setCategories({ categories }: IBlog) {
    const helperArr:any = []
    categories?.map((cat:any)=>(
        helperArr.push({
            categoriesName: cat.name,
            categoriesSlug: cat.slug,
            categoriesId: cat._id
        })
    ))
    this.categories = helperArr;
  }

  
   /**
   * set tags
   * @param tags
   * @private
   */

   private _setTags({ tags }: IBlog) {
    const helperArr:any = []
    tags?.map((tag:any)=>(
        helperArr.push({
            tagName: tag.name,
            tagSlug: tag.slug,
            tagId: tag._id
        })
    ))
    this.tags = helperArr;
  }



  /**
   * set title
   * @param title
   * @private
   */

  private _setName({ title }: IBlog) {
    this.title = title;
  }

    /**
   * set postedBy
   * @param postedBy
   * @private
   */

    private _setPostedBy({ postedBy }: IBlog) {
        this.postedBy = postedBy;
      }
}


