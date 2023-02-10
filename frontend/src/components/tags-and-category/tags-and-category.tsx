import React from 'react'
import { generateGuid } from 'src/core/layouts/public/helpers/common-functions/common-functions'
import css from "./tags-and-category.module.scss"

const TagsAndCategoryComponent = ({data,className,tag,category}:any) => {
    console.log(data,"daa")
  return (
    <div className={css.tag_category}>
        <ul className={`${css.tag_category_list} ${className}`}>
        {data &&
            data.map((item:any)=>(
                <li key={generateGuid()} className={`${tag ? css.tag_category_tag:css.tag_category_category}`}>{item.title
                }</li>
            ))
        }
        </ul>
    </div>
  )
}

export default TagsAndCategoryComponent