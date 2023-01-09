import Cookies from 'js-cookie'
import  Router  from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const AdminPrivateComponent = ({children}:any) => {
  const user:any = useSelector((state: any) => state.publicState.user)
  const token = Cookies.get("token")

  return (
    <div>{children}</div>
  )
}

export default AdminPrivateComponent