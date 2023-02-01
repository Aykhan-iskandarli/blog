import { IBlog } from "../types/blog";

export class BlogDetailModel {
  public title: string | undefined;
  public body: string | undefined;
  public id: number | string | undefined;
  public categories: string | undefined | null=null;
  public tags: string | undefined;
  public slug: string | undefined;
  public createdAt: string | undefined;
  public updatedAt: string | undefined;
  public postedBy: object | undefined | null=null;

  constructor(item: IBlog) {
    this._setId(item);
    this._setName(item);
    this._setBody(item)
    this._setSlug(item);
    this._setCategories(item);
    this._setTags(item);
    this._setPostedBy(item);
    this._setCreatedAt(item);
    this._setUpdatedAt(item);
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
   * set body
   * @param body
   * @private
   */

  private _setBody({ body }: IBlog) {

    this.body = body;
  }

    /**
   * set postedBy
   * @param postedBy
   * @private
   */

    private _setPostedBy({ postedBy }: IBlog) {
        this.postedBy = postedBy;
      }

      
    /**
   * set createAt
   * @param createAt
   * @private
   */

    private _setCreatedAt({ createdAt }: IBlog) {
      this.createdAt = createdAt;
    }
    
      
    /**
   * set updatedAt
   * @param updatedAt
   * @private
   */

    private _setUpdatedAt({ updatedAt }: IBlog) {
      this.updatedAt = updatedAt;
    }
}


