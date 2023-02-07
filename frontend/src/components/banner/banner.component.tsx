import Link from 'next/link'
import React from 'react'
import css from "./banner.module.scss"

const BannerComponent = ({title,current}:any) => {
  return (
      <div className={`${css.banner} my-20`}>
          <div className={css.banner_title}>
                <h1>{title}</h1>
          </div>
          <div className={css.banner_path}>
             <Link href="/"><a>Home</a></Link> / <span>{current}</span>
          </div>
      </div>
  )
}

export default BannerComponent