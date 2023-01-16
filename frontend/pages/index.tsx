import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCategory } from 'store/category/store/action'

export default function Home() {
  const dispatch:any = useDispatch()
  useEffect(()=>{
    dispatch(getCategory())
  },[])
  return (
    <div>
    saam
    </div>
  )
}
