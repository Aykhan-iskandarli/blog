import Router from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { isAuth } from 'src/core/layouts/public/store/actions'

const PrivateComponent = ({children}:any) => {

    // const user:any = useSelector((state: any) => state.publicState.user)
    // useEffect(() => {
    //   if (!isAuth()) {
    //     Router.push("/login");
    //   } else if (user.role === 1) {
    //     Router.push("/admin");
    //   } else {
    //     Router.push("/");
    //   }
    // }, [user.role]);

 
  return (
    <div>
        {children}
    </div>
  )
}

export default PrivateComponent